import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";



export default function Pending() {


    return (
        <>
            <h1>Pagamento pendente</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});