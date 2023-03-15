import React from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";


export default function MyAccount() {

    return (
        <>
            <h1>Minha Conta</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
 
    return {
       props: {}
    }
 
 });