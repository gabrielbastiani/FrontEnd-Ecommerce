import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { HeaderAccount } from "../../components/HeaderAccount";


export default function Carrinho() {


    return (
        <>
            <Head>
                <title>Carrinho</title>
            </Head>

            <HeaderAccount />

            <PageSection>

            </PageSection>
            <br />
            <br />
            <FooterAccount />
        </>
    )
}