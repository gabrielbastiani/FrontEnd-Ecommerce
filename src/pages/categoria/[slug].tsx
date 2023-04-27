import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import {
    AsideConteiner,
    Boxbreadcrumbs,
    Bread,
    ContainerContent,
    ContentPage,
    PageSection
} from "../../components/dateStoreUx/styles";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { IoIosHome } from 'react-icons/io';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import Link from "next/link";


export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug;

    

    return (
        <>
            <Head>
                <title>{""}</title>
            </Head>

            <HeaderStore />

            <PageSection>
                <Bread>
                    <Boxbreadcrumbs>
                        <Link href="http://localhost:3001">
                            <IoIosHome size={22} color="red" /> / &nbsp;
                        </Link>
                        <Link href={"http://localhost:3001/categoria/" + ""}>
                            {""}
                        </Link>
                    </Boxbreadcrumbs>
                </Bread>
                <ContainerContent>
                    <AsideConteiner>

                        <span>Sub categorias:</span>

                        

                        <div>
                            <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                            <span>Filtrar por:</span>
                        </div>
                        
                    </AsideConteiner>

                    <ContentPage>
                        content
                    </ContentPage>
                </ContainerContent>
            </PageSection>

            <FooterStore />
            <FooterAccount />
        </>
    )
}