import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import Head from "next/head";
import { HeaderAccount } from "../../../../components/HeaderAccount";
import { Grid } from "../../../../components/dateClientUx/Estrutura/styles";
import MainHeader from "../../../../components/dateClientUx/MainHeader";
import Aside from "../../../../components/dateClientUx/Aside";
import { Container } from "../../../../components/dateClientUx/ContainerContent/styles";
import { Card } from "../../../../components/dateClientUx/CardContent/styles";
import { BlockTop } from "../../../../components/dateClientUx/BlockTops/styles";
import Titulos from "../../../../components/Titulos";
import { canSSRAuth } from "../../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../../services/api";



export default function Pedido() {

    const router = useRouter();
    let pedido_id = router.query.pedido_id;
    
    const { user } = useContext(AuthContext);
    let user_id = user?.id;


    return (
        <>
            <Head>
                <title>Pedido</title>
            </Head>

            <HeaderAccount />

            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Pedido"
                            />
                        </BlockTop>

                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});