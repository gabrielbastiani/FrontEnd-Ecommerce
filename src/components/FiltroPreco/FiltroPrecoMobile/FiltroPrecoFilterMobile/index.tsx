import { useEffect, useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { ButtonFilter, EtiquetaPrice, RangeInput, TextTitle } from "./styles";
import { setupAPIClient } from "../../../../services/api";


interface FiltroPrecoRequest {
    products: any;
}

const FiltroPrecoFilterMobile = ({ products }: FiltroPrecoRequest) => {

    const [priceValueMin, setPriceValueMin] = useState(maxPrice);
    const [priceValueMax, setPriceValueMax] = useState(maxPrice);
    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display = datasConfigs[0]?.filter_price === "Disponivel" ? "block" : "none";

    var arrPrice = [];
    arrPrice.push({
        "priceMin": priceValueMin,
        "priceMax": priceValueMax
    });

    const filterPrices = () => {
        const WEB_URL = 'http://localhost:3001';
        let paramPrice = '';
        const verifyArrMin: any = arrPrice.map(ver => ver?.priceMin);
        const verifyArrMax: any = arrPrice.map(ver => ver?.priceMax);

        if (Number(verifyArrMin) < Number(verifyArrMax)) {
            arrPrice && arrPrice.map((ele) => {
                paramPrice = paramPrice + 'priceMin=' + ele?.priceMin + '&' + 'priceMax=' + ele?.priceMax
            });
        } else {
            return toast.error("O valor do preço minimo não pode ser maior que o valor do preço máximo!!!");
        }

        const NEW_URL = WEB_URL + '?' + paramPrice;
        let urlPrice = new URL(NEW_URL);
        let params = new URLSearchParams(urlPrice.search);

        Router.push(`/filter/filterPrice?${params}`);
    }

    const maxPriceVAlu = products.map(item => item?.price);

    var minPrice = Math.min(...maxPriceVAlu);
    var maxPrice = Math.max(...maxPriceVAlu);

    const changePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceValueMin(parseInt(event.target.value));
    };

    const changePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceValueMax(parseInt(event.target.value));
    };

    const formatter = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });


    return (
        <>
            <TextTitle style={{ fontWeight: 'bold', display: display }}>
                Preço por:
            </TextTitle>
            <br />
            <br />
            <EtiquetaPrice
                style={{ display: display }}
            >
                Minimo:
                <RangeInput
                    type='range'
                    onChange={changePriceMin}
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceValueMin}
                    defaultValue={0}
                />
                {priceValueMin ? formatter.format(priceValueMin) : String(minPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}
            </EtiquetaPrice>
            <br />
            <br />
            <EtiquetaPrice
                style={{ display: display }}
            >
                Máximo:
                <RangeInput
                    type='range'
                    onChange={changePriceMax}
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceValueMax}
                    defaultValue={9999999999999999999999}
                />
                {priceValueMax ? formatter.format(priceValueMax) : String(maxPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}
            </EtiquetaPrice>
            <br />
            <br />
            <ButtonFilter onClick={filterPrices} style={{ display: display }}>
                Filtrar Preços
            </ButtonFilter>
        </>
    );
};

export default FiltroPrecoFilterMobile;