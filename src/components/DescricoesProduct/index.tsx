import { useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BoxDescription, Button, Buttons, Carousel, Container, Item } from './styles';


interface DescricaoRequest {
    descriptions: any;
}

const DescricoesProduct = ({ descriptions }: DescricaoRequest) => {

    const carousel = useRef(null);

    function handleLeftClick(e: any) {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    function handleRightClick(e: any) {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!descriptions || !descriptions.length) return null;

    const [activeTab, setActiveTab] = useState("");
    const [toogle, setToogle] = useState(!activeTab);

    const handleClick = (id: string) => {
        setActiveTab(id);
        setToogle(state => !state);
    };

    function createMarkup(c: any) {
        return { __html: c };
    }


    return (
        <Container>
            <Carousel ref={carousel}>
                {descriptions.map((item: any) => {
                    return (
                        <Item
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                        >
                            {item?.title}
                        </Item>
                    )
                })}
            </Carousel>
            <Buttons>
                <Button onClick={handleLeftClick}>
                    <FaArrowLeft size={35} color='gray' />
                </Button>
                <Button onClick={handleRightClick}>
                    <FaArrowRight size={35} color='gray' />
                </Button>
            </Buttons>
            {descriptions.map((desc: any) => {
                return (
                    <>
                        {activeTab === desc?.id ? (
                            <BoxDescription
                                key={desc?.id}
                                dangerouslySetInnerHTML={createMarkup(desc?.description)}
                            ></BoxDescription>
                        ) :
                            null
                        }
                    </>
                )
            })}
        </Container>
    )
}

export default DescricoesProduct;