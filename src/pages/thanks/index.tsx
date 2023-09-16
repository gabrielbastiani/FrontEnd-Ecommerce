import { setupAPIClient } from "../../services/api";
import { canSSRAuthPayment } from "../../utils/canSSRAuthPayment";
import Head from "next/head";
import { SectionThanks } from "./styles";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import FooterAccount from "../../components/FooterAccount";
import { HeaderThanks } from "../../components/HeaderThanks";


export default function thanks() {
    
    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    useEffect(() => {
        async function loadCustomerData() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findFirstPaymentInStoreCustomer?customer_id=${customer_id}`);

               console.log(data)

            } catch (error) {
                console.log(error);
            }
        }
        loadCustomerData();
    }, [customer_id]);

    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
            </Head>

            <HeaderThanks />

           <SectionThanks>
                ffffffffff
           </SectionThanks>

           <FooterAccount />
        </>
    )
}

export const getServerSideProps = canSSRAuthPayment(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});