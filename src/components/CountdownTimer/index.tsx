import { useEffect, useState } from "react";
import {
    BoxArrow,
    BoxInfosPromotion,
    ButtonPromo,
    ContainerCountDown,
    ContainerTimeDown,
    DataText,
    SectionTimeDown,
    TextTimer,
    Titulo
} from "./styles";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import Link from "next/link";
import { setupAPIClient } from "../../services/api";

type ItemProps = {
    text_promotion: string;
    text_button: string;
    link_button: string;
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    second: string;
}

function CountdownTimer() {

    const [dataAll, setDataAll] = useState<ItemProps>();
    const [link_button, setLink_button] = useState(String);

    const apiClient = setupAPIClient();

    useEffect(() => {
        async function loadCountDown() {
            try {
                const { data } = await apiClient.get('/findCountDownTime');

                setDataAll(data || {});
                setLink_button(data?.link_button || "");

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCountDown();
    }, []);

    const data = `${dataAll?.year}-${dataAll?.month}-${dataAll?.day}T${dataAll?.hour}:${dataAll?.minute}:00`;

    const targetDate = new Date(data).getTime();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    async function endtime() {
        await apiClient.put(`/disaledCountDownTimer`);
        await apiClient.get(`/reloadDatasConfigsStore`);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(updatedTimeLeft);

            if (updatedTimeLeft.total <= 0) {
                clearInterval(interval);
                endtime();
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDate]);

    function calculateTimeLeft(targetDate: number) {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            total: difference,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs();
    }, []);

    const display = datasConfigs[0]?.count_down_timer === "Disponivel" ? "block" : "none";


    return (
        <SectionTimeDown
            style={{ display: display }}
        >
            <BoxInfosPromotion>
                <Titulo>{dataAll?.text_promotion}</Titulo>
            </BoxInfosPromotion>
            <ContainerTimeDown>
                <BoxArrow>
                    <BsFillArrowRightCircleFill color="red" fontSize={40} fontWeight={900} />
                </BoxArrow>
                <ContainerCountDown>
                    <TextTimer>Dias</TextTimer>
                    <DataText>
                        {timeLeft.days}
                    </DataText>
                </ContainerCountDown>

                <ContainerCountDown>
                    <TextTimer>Horas</TextTimer>
                    <DataText>
                        {timeLeft.hours}
                    </DataText>
                </ContainerCountDown>

                <ContainerCountDown>
                    <TextTimer>Minutos</TextTimer>
                    <DataText>
                        {timeLeft.minutes}
                    </DataText>
                </ContainerCountDown>

                <ContainerCountDown>
                    <TextTimer>Segundos</TextTimer>
                    <DataText>
                        {timeLeft.seconds}
                    </DataText>
                </ContainerCountDown>
                <BoxArrow>
                    <BsFillArrowLeftCircleFill color="red" fontSize={40} fontWeight={900} />
                </BoxArrow>
            </ContainerTimeDown>
            <BoxInfosPromotion>
                <Link href={link_button} target="_blank">
                    <ButtonPromo>
                        {dataAll?.text_button}
                    </ButtonPromo>
                </Link>
            </BoxInfosPromotion>
        </SectionTimeDown>
    );
}

export default CountdownTimer;