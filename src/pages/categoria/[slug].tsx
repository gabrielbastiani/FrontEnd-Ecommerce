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

    const [categoriesLateral, setCategoriesLateral] = useState([]);
    const [nameItens, setNameItens] = useState("");

    

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/pocisaoListGroup?slugPosicao=lateral-esquerda&slugCategoryOrItem=${slug}`);

                setCategoriesLateral(data?.group || []);
                setNameItens(data?.names?.itemName);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadGroups();
    }, [slug]);
    

    return (
        <>
            <Head>
                <title>{nameItens}</title>
            </Head>

            <HeaderStore />

            <PageSection>
                <Bread>
                    <Boxbreadcrumbs>
                        <Link href="http://localhost:3001">
                            <IoIosHome size={22} color="red" /> / &nbsp;
                        </Link>
                        <Link href={"http://localhost:3001/categoria/" + ""}>
                            {nameItens}
                        </Link>
                    </Boxbreadcrumbs>
                </Bread>
                <ContainerContent>
                    <AsideConteiner>

                        {categoriesLateral.length > 1 ? (
                            <>
                                <span>Sub categorias:</span>
                                {categoriesLateral.map((item) => {
                                    return (
                                        <span>{item?.itemName}</span>
                                    )
                                })}
                           </>
                        ) : 
                            null
                        }

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