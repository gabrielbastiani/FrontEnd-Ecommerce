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


export default function Envioeprazodeentrega() {

    const [content, setContent] = useState<any []>([]);

    useEffect(() => {
        async function loadPages() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listInstitutionalText?slugPosition=envios-e-prazo-de-entrega`);
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
                <title>Envios e Prazos de Entrega</title>
            </Head>

            <HeaderStore />
            <br />
            <br />
            <PageSection>
                {content.length < 1 ? (
                    <Avisos texto="Não há conteúdo nenhum ainda por aqui..." />
                ) : 
                    content.map((item, index) => {
                        return (
                            <SectionPage key={index}>
                                <Titulos tipo="h1" titulo={item?.title} />
                                <ContentBox
                                    dangerouslySetInnerHTML={{ __html: item?.description }}
                                ></ContentBox>
                            </SectionPage>
                        )
                    })
                }
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