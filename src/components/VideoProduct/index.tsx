import Titulos from "../Titulos";
import { BoxVideo, BoxVideoContatiner, VideoProductBox } from "./styles";


interface VideoRequest {
    video: string;
}

const VideoProduct = ({ video }: VideoRequest) => {

    return (
        <BoxVideoContatiner>
            <VideoProductBox>
                <iframe
                    width="620"
                    height="380"
                    src={`https://www.youtube.com/embed/${video}`}
                    allowFullScreen
                    title="Embedded youtube"
                />
            </VideoProductBox>

            <BoxVideo>
                <Titulos tipo="h1" titulo="Video do Produto" />
            </BoxVideo>
        </BoxVideoContatiner>
    )
}

export default VideoProduct;