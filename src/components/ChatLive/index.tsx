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
                    __html: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                        s1.async=true;
                        s1.src='${datasConfigs[0]?.code_live_chat_tawkTo}';
                        s1.charset='UTF-8';
                        s1.setAttribute('crossorigin','*');
                        s0.parentNode.insertBefore(s1,s0);
                    })();
                    `,
                }}
            />
        </ChatsLive>
    );
};


export default ChatLive;