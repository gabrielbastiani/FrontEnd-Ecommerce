import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import pagamentsFooterAccount from '../../assets/formas-de-pagamento-footer-account.png';
import selosSegurancaFooterAccount from '../../assets/selos-de-seguranca-footer-account.png';
import Image from 'next/image';
import {
    FooterContainer,
    ContentFooter,
    BlockPayments,
    BlockSecuryty,
    BlockDataContent,
    LinhaDivisoria,
    DateLoja,
    BlockDateLoja
} from './styles';


const FooterAccount = () => {

    const [cnpjLoja, setCnpjLoja] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');

    const [imagesInstitucional, setImagesInstitucional] = useState([]);
    const orderImageUm = imagesInstitucional.slice(0, 1);

    const orderImageDois = imagesInstitucional.slice(1, 2);

    useEffect(() => {
        async function loadImagesInstitucional() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listImagesLoja?slugPosicao=rodape-loja`);

                setImagesInstitucional(response.data || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadImagesInstitucional();
    }, []);

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);

                setCnpjLoja(response.data.cnpjLoja || "");
                setRuaLoja(response.data.ruaLoja || "");
                setNumeroLoja(response.data.numeroLoja || "");
                setBairroLoja(response.data.bairroLoja || "");
                setCepLoja(response.data.cepLoja || "");
                setCityLoja(response.data.cityLoja || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    const anoAtual = new Date().getFullYear();

    return (
        <>
            <FooterContainer>
                <ContentFooter>
                    <BlockPayments>
                        {orderImageUm.map((item) => {
                            return (
                                <>
                                    <Image src={'http://localhost:3333/files/' + item?.image} width={580} height={65} alt="Pagamentos Loja Builder Seu Negocio Online" />
                                </>
                            )
                        })}
                    </BlockPayments>
                    <BlockSecuryty>
                        {orderImageDois.map((item) => {
                            return (
                                <>
                                    <Image src={'http://localhost:3333/files/' + item?.image} width={450} height={65} alt="Selos de Seguranca Loja Builder Seu Negocio Online" />
                                </>
                            )
                        })}
                    </BlockSecuryty>
                </ContentFooter>
                <LinhaDivisoria />
                <BlockDataContent>
                    <BlockDateLoja>
                        <DateLoja>Copyright {anoAtual} © Todos os direitos reservados.<br /> {cnpjLoja} {ruaLoja}, {numeroLoja} - {bairroLoja} - {cityLoja} - CEP: {cepLoja}</DateLoja>
                    </BlockDateLoja>
                </BlockDataContent>
            </FooterContainer>
        </>
    )
}

export default FooterAccount;