import { useEffect, useState } from "react";
import { ChatsLive } from "./styles";
import { setupAPIClient } from "../../services/api";

const ChatLive = () => {

    const apiClient = setupAPIClient();
    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

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


    return (
        <ChatsLive>
            <script
                dangerouslySetInnerHTML={{
                    __html: datasConfigs[0]?.code_live_chat_tawkTo,
                }}
            />
        </ChatsLive>
    );
};


export default ChatLive;