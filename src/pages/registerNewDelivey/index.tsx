import { useContext, useEffect, useState } from 'react';
import { canSSRAuthPayment } from '../../utils/canSSRAuthPayment';
import {
    ContLogin,
    ContainerCenter,
    ExitDelivery,
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import Head from 'next/head';
import Titulos from '../../components/Titulos';
import { CartContext } from '../../contexts/CartContext';
import { setupAPIClient } from '../../services/api';
import {
    BoxButtonsFunctions,
    BoxDelivery,
    BoxInputs,
    ButtonDelivery,
    InputDelivery,
    TextCurrent,
    TextCurrentBold,
    TextCurrentInput
} from '../payment/styles';
import { AiOutlineCompass } from 'react-icons/ai';
import Router from 'next/router';
import Link from 'next/link';


type CepProps = {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

export default function registerNewDelivey() {
    /* @ts-ignore */
    const { cartProducts } = useContext(CartContext);
    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [searchAddress, setSearchAddress] = useState<CepProps>();

    const [addresseeSelected, setAddresseeSelected] = useState("");
    const [numeroSelected, setNumeroSelected] = useState("");
    const [referenceSelected, setReferenceSelected] = useState("");
    const [complementSelected, setComplementSelected] = useState("");

    const [cepNew, setCepNew] = useState("");


    useEffect(() => {
        const apiClient = setupAPIClient();
        try {
            async function loadCartTotal() {
                const storageId = String(cartProducts[0]?.store_cart_id);
                const { data } = await apiClient.get(`/findTotalCart?store_cart_id=${storageId}`);
                setCepNew(data?.cep || "");
            }
            loadCartTotal();
        } catch (error) {
            console.log(error.response.data);
        }
    }, [cartProducts]);

    useEffect(() => {
        async function loadCep() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.post(`/findAddressCep`, { cep: cepNew });
                setSearchAddress(response?.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCep();
    }, [cepNew]);

    async function handleRegisterNewDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/customer/delivery/createDeliveryAddress`, {
                customer_id: customer_id,
                addressee: addresseeSelected,
                address: searchAddress?.logradouro,
                number: numeroSelected,
                neighborhood: searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro",
                complement: complementSelected,
                reference: referenceSelected,
                cep: searchAddress?.cep,
                city: searchAddress?.localidade,
                state: searchAddress?.uf
            });

            Router.push('/payment');

        } catch (error) {
            console.log(error.response.data);
        }
    }


    return (
        <>
            <Head>
                <title>Cadastro de endereço</title>
            </Head>

            <ContainerCenter>

                <ContLogin>
                    <Titulos
                        tipo="h2"
                        titulo="Cadastre esse novo CEP/Endereço"
                    />

                    <Link href='/payment'>
                        <ExitDelivery>
                            Não cadastrar, seguir para o pagamento
                        </ExitDelivery>
                    </Link>

                    <BoxDelivery>
                        <br />
                        <TextCurrentBold>Destinatário</TextCurrentBold>
                        <InputDelivery
                            value={addresseeSelected}
                            onChange={(e) => setAddresseeSelected(e.target.value)}
                        />
                        <br />
                        <BoxInputs>
                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {searchAddress?.logradouro}</TextCurrentInput>
                            <InputDelivery
                                value={numeroSelected}
                                onChange={(e) => setNumeroSelected(e.target.value)}
                            />
                            <br />
                            <br />
                        </BoxInputs>

                        <BoxInputs>
                            <TextCurrentBold>Complemento: </TextCurrentBold>
                            <InputDelivery
                                value={complementSelected}/* @ts-ignore */
                                onChange={(e) => setComplementSelected(e.target.value)}
                            />
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</TextCurrent>

                        <BoxInputs>
                            <TextCurrentBold>Referencia: </TextCurrentBold>
                            <InputDelivery
                                value={referenceSelected}/* @ts-ignore */
                                onChange={(e) => setReferenceSelected(e.target.value)}
                            />
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddress?.localidade} - {searchAddress?.uf}</TextCurrent>

                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddress?.cep}</TextCurrent>

                        <BoxButtonsFunctions>
                            <ButtonDelivery
                                style={{ backgroundColor: 'green', color: 'white' }}
                                onClick={handleRegisterNewDelivery}
                            >
                                Cadastrar endereço
                            </ButtonDelivery>
                        </BoxButtonsFunctions>

                    </BoxDelivery>

                </ContLogin>
            </ContainerCenter>
        </>
    )
}

export const getServerSideProps = canSSRAuthPayment(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});