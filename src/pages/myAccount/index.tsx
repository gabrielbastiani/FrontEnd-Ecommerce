import React from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderAccount } from "../../components/HeaderAccount";


export default function MyAccount() {

    return (
        <>
            <Head>
                <title>Sua Conta na Loja</title>
            </Head>

            <HeaderAccount />

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    return {
        props: {}
    }

})