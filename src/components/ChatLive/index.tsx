import { ChatsLive } from "./styles";

const ChatLive = () => {

    return (
        <ChatsLive>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                        s1.async=true;
                        s1.src='https://embed.tawk.to/628956297b967b1179909239/1g3k7h5ak';
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