import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Chats } from "./styles";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const Chat = () => {

    const apiClient = setupAPIClient();

    function removerSimbolos(str: string) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    const [whats, setWhats] = useState("");
    const [storeName, setStoreName] = useState("");
    const [logoStore, setLogoStore] = useState("");
    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    const phone = removerSimbolos(whats);

    useEffect(() => {
        async function loadStore() {
            try {
                const response = await apiClient.get(`/store`);
                setWhats(response?.data?.cellPhone || "");
                setStoreName(response?.data?.name || "");
                setLogoStore(response?.data?.logo || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs();
    }, []);

    const display = datasConfigs[0]?.chat_whatsapp === "Disponivel" ? "block" : "none";

    

    return (
        <Chats
            style={{
                display: display
            }}
        >
            <FloatingWhatsApp
                phoneNumber={datasConfigs[0]?.number_whatsapp ? datasConfigs[0]?.number_whatsapp : phone}
                accountName={storeName}
                allowEsc
                allowClickAway
                notification
                notificationSound
                chatMessage='Olá, em que posso ajudar?'
                placeholder='Escreva aqui!'
                statusMessage='Respondemos rápido'
                avatar={"http://localhost:3333/files/" + logoStore}
                buttonStyle={{ left: '50px' }}
                chatboxStyle={{ left: '20px' }}
            />
        </Chats>
    );
};


export default Chat;