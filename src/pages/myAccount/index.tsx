import React from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";


export default function MyAccount() {

    return (
        <>
            <Head>
                <title>Sua Conta na Loja</title>
            </Head>

            <h1>Minha Conta</h1>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    return {
        props: {}
    }

})