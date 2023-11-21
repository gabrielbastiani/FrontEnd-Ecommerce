import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { FaWhatsapp } from "react-icons/fa";
import { Chats } from "./styles";

const Chat = () => {

    const apiClient = setupAPIClient();

    function removerSimbolos(str: string) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    const [whats, setWhats] = useState("");
    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    const phone = removerSimbolos(whats);

    useEffect(() => {
        async function loadStore() {
            try {
                const response = await apiClient.get(`/store`);
                setWhats(response.data.cellPhone || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    const openWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=${datasConfigs[0]?.number_whatsapp ? datasConfigs[0]?.number_whatsapp : phone}`;
        window.open(url, '_blank');
    };

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
                display: display,
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#25d366',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                zIndex: '9999',
            }}
            onClick={openWhatsAppChat}
        >
            <FaWhatsapp size={38} color="#fff" />
        </Chats>
    );
};


export default Chat;