import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Button } from "../ui/Button";
import { BlockIA, BoxIA, SectionIA, TextAreaAI, TextResults, TextWait } from "./styles";
import { toast } from "react-toastify";
import Titulos from "../Titulos";


type ResultText = {
    resposta: string;
}

const ChatIA = () => {

    const [chatText, setChatText] = useState("");
    const [chatResults, setChatResults] = useState<ResultText>();
    const [error, setError] = useState("");

    const [iaChat, setIaChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonLimp, setButtonLimp] = useState(false);

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display = datasConfigs[0]?.chat_ia === "Disponivel" ? "block" : "none";

    const toggleIaChat = () => {
        setIaChat(true);
    }

    const toggleIaChatClose = () => {
        setIaChat(false);
    }

    async function handleResultIAChat() {
        const apiClient = setupAPIClient();
        try {
            setLoading(true);
            setButtonLimp(false);

            const { data } = await apiClient.post(`/searchIaChat`, { searchText: chatText });

            setLoading(false);
            setButtonLimp(true);

            setChatResults(data || "");

        } catch (error) {
            toast.error(`${error.response.data.error}`);
            setError(`${error.response.data.error}`);
            console.log(error.response.data);
        }
    }

    const limpSearch = () => {
        setChatText("");/* @ts-ignore */
        setChatResults("");
        setButtonLimp(false);
    }


    return (
        <>
            {iaChat ? (
                <SectionIA>
                    <BlockIA>
                        <Titulos
                            tipo="h1"
                            titulo="Use nossa IA"
                        />
                        <Button
                            onClick={toggleIaChatClose}
                        >
                            Não obrigado
                        </Button>
                        <br />
                        <TextAreaAI
                            placeholder="Pergunte aqui, alguma duvida técnica em relação algum produto aqui da loja..."
                            onChange={(e) => setChatText(e.target.value)}
                        />
                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={handleResultIAChat}
                        >
                            Buscar
                        </Button>

                        {loading ? (
                            <TextWait>ESPERE A RESPOSTA POR FAVOR, PODE DEMORAR...</TextWait>
                        ) :
                            <BoxIA>
                                <TextResults>{chatResults?.resposta}</TextResults>
                                {buttonLimp ?
                                    <Button
                                        onClick={limpSearch}
                                    >
                                        Limpar Buscar
                                    </Button>
                                    :
                                    null
                                }

                            </BoxIA>
                        }
                    </BlockIA>
                </SectionIA>
            ) :
                <SectionIA>
                    <BlockIA
                        style={{ display: display }}
                    >
                        <Button
                            style={{ width: '100%' }}
                            onClick={toggleIaChat}
                        >
                            Use nossa IA
                        </Button>
                    </BlockIA>
                </SectionIA>
            }
        </>
    );
};


export default ChatIA;