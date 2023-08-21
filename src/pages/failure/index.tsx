import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";



export default function Failure() {


    return (
        <>
            <h1>Falha no pagamento</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});