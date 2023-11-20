import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { FaWhatsapp } from "react-icons/fa";
import { Chats } from "./styles";

const Chat = () => {

    function removerSimbolos(str: string) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    const [whats, setWhats] = useState("");

    const phone = removerSimbolos(whats);

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
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
        const url = `https://api.whatsapp.com/send?phone=${phone}`;
        window.open(url, '_blank');
    };



    return (
        <Chats
            style={{
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