import { FaSpinner } from "react-icons/fa";
import { Load, LoadText, LoadingScreen, TextLoad } from "./styles";


export const Loading = () => (
    <LoadingScreen>
        <Load>
            <FaSpinner color="#f01c1c" size={50} />
        </Load>
        <LoadText>
            <TextLoad>AGUARDE...</TextLoad>
        </LoadText>
    </LoadingScreen>
)