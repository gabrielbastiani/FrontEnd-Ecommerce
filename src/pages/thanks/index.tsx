import { Head } from "next/document";
import { setupAPIClient } from "../../services/api";
import { canSSRAuthPayment } from "../../utils/canSSRAuthPayment";


export default function thanks() {
    


    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
            </Head>

           

            


        </>
    )
}

export const getServerSideProps = canSSRAuthPayment(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});