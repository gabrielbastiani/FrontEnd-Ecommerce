import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderStore } from "../../components/HeaderStore";
import { PageSection } from "../../components/dateStoreUx/styles";
import { Avisos } from "../../components/Avisos";
import Titulos from "../../components/Titulos";
import { ContentBox, SectionPage } from "./styles";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";


export default function Atendimento() {

    const [content, setContent] = useState<any []>([]);

    useEffect(() => {
        async function loadPages() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listInstitutionalText?slugPosition=pagina-contato`);
                setContent(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadPages();
    }, []);

    return (
        <>
            <Head>
                <title>Contato</title>
            </Head>

            <HeaderStore />
            <br />
            <br />
            <PageSection>
                <Avisos texto="Não há conteúdo nenhum ainda por aqui..." />


                
            </PageSection>
            <br />
            <br />
            <br />
            <br />
            <FooterStore />
            <FooterAccount />
        </>
    )
}