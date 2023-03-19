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

    const [loja_id, setLoja_id] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [cnpjLoja, setCnpjLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');
    const [stateLoja, setStateLoja] = useState('');


    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);

                setLoja_id(response.data.loja_id || "");
                setNameLoja(response.data.nameLoja || "");
                setCnpjLoja(response.data.cnpjLoja || "");
                setEmailLoja(response.data.emailLoja || "");
                setPhoneLoja(response.data.phoneLoja || "");
                setRuaLoja(response.data.ruaLoja || "");
                setNumeroLoja(response.data.numeroLoja || "");
                setBairroLoja(response.data.bairroLoja || "");
                setCepLoja(response.data.cepLoja || "");
                setCityLoja(response.data.cityLoja || "");
                setStateLoja(response.data.stateLoja || "");

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
                        <Image src={pagamentsFooterAccount} width={580} height={65} alt="Pagamentos Loja Builder Seu Negocio Online" />
                    </BlockPayments>
                    <BlockSecuryty>
                        <Image src={selosSegurancaFooterAccount} width={450} height={65} alt="Selos de Seguranca Loja Builder Seu Negocio Online" />
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