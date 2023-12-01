import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
    Container,
    Profile,
    Welcome,
    UserName,
    NotificationBell,
    DropDownContent,
    Title,
    BlockButtonsNotification,
    AllViewd,
    ClearNotifications,
    LinkNotification,
    BlockNotification,
    BoxIcons,
    Block,
    Viewed,
    Menssages,
    ClockBlock,
    DataNotification
} from './styles';
import { AuthContext } from '../../../contexts/AuthContext';
import { FaBell, FaCartPlus, FaRegBell, FaRegClock } from 'react-icons/fa';
import { AmountItens } from '../../HeaderStore/styles';
import { setupAPIClient } from '../../../services/api';
import { Avisos } from '../../Avisos';
import moment from 'moment';


export const MainHeader = () => {

    const { customer } = useContext(AuthContext);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [openNotification, setOpenNotification] = useState(true);
    const [viewd, setViewd] = useState<any[]>([]);
    const [newFalse, setNewFalse] = useState(Number);

    const handleNotificationOpen = () => {
        setOpenNotification(!openNotification);
    }

    useEffect(() => {
        function loadNumberNotifications() {
            const booleanArray = viewd.map(fal => fal.viewed);
            const falseValues = booleanArray.filter(value => value === false);
            setNewFalse(falseValues.length);
        }
        loadNumberNotifications();
    }, [viewd]);

    useEffect(() => {
        async function findNotificationsCustomer() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/notificationPainelCustomer?customer_id=${customer?.id}`);

                setNotifications(data.slice(0, 15));
                setViewd(data);

            } catch (error) {
                console.error(error);
            }
        }
        findNotificationsCustomer();
    }, [customer?.id]);

    async function findNotificationsCustomer() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/notificationPainelCustomer?customer_id=${customer?.id}`);

            setNotifications(data.slice(0, 15));

        } catch (error) {
            console.error(error);
        }
    }

    function loadNumberNotifications() {
        const booleanArray = viewd.map(fal => fal.viewed);
        const falseValues = booleanArray.filter(value => value === false);
        setNewFalse(falseValues.length);
    }

    async function notificationsViewd(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateViewdNotificationCustomer?notificationCustomer_id=${id}&customer_id=${customer?.id}`);
            loadNumberNotifications();
            findNotificationsCustomer();
        } catch (error) {
            console.error(error);
        }
    }

    async function notificationsAllViewd() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllViewdNotificationCustomer?customer_id=${customer?.id}`);
            loadNumberNotifications();
            findNotificationsCustomer();
        } catch (error) {
            console.error(error);
        }
    }

    async function clearAllnotifications() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/clearAllNotificationsCustomer?customer_id=${customer?.id}`);
            loadNumberNotifications();
            findNotificationsCustomer();
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Container>
            <Profile>
                <Welcome>Olá</Welcome>
                <UserName>{customer?.name}</UserName>
            </Profile>

            <NotificationBell onClick={handleNotificationOpen}>
                {newFalse === 0 ?
                    <FaRegBell size={20} />
                    :
                    <>
                        <AmountItens>
                            <span>{newFalse}</span>
                        </AmountItens>
                        <FaBell size={20} />
                    </>
                }
            </NotificationBell>

            {openNotification ?
                null
                :
                <>
                    <DropDownContent>
                        <Title>Notificações</Title>
                        <BlockButtonsNotification>
                            <AllViewd
                                onClick={notificationsAllViewd}
                            >
                                Marcar todas como lidas
                            </AllViewd>
                            <ClearNotifications
                                onClick={clearAllnotifications}
                            >
                                Limpar todas notificações
                            </ClearNotifications>
                        </BlockButtonsNotification>

                        {notifications.length === 0 ?
                            <Avisos texto='Sem notificações ainda...' />
                            :
                            <>
                                {notifications.map((item, index) => {
                                    return (
                                        <>
                                            {item.block_bell === true ?
                                                <LinkNotification
                                                    key={index}
                                                    href={item.link}
                                                    onClick={() => notificationsViewd(item.id)}
                                                >
                                                    <BlockNotification style={{ background: item.viewed === true ? '#ff000052' : 'unset' }}>
                                                        <BoxIcons>
                                                            <FaCartPlus size={28} />
                                                        </BoxIcons>
                                                        <Block>
                                                            {item.viewed === true ? <Viewed>VISUALIZADA</Viewed> : null}
                                                            <Menssages
                                                                dangerouslySetInnerHTML={{ __html: item.message }}
                                                            ></Menssages>
                                                            <ClockBlock>
                                                                <FaRegClock size={20} />
                                                                <DataNotification>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DataNotification>
                                                            </ClockBlock>
                                                        </Block>
                                                    </BlockNotification>
                                                </LinkNotification>
                                                :
                                                null
                                            }
                                        </>
                                    )
                                })}
                            </>
                        }
                    </DropDownContent>
                </>
            }
        </Container>
    );
}

export default MainHeader;