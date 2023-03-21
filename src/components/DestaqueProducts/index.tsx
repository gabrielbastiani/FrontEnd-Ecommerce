
import destaque1 from '../../assets/banners/Maquina de Solda1.png';
import destaque2 from '../../assets/banners/Maquina de Solda2.png';
import destaque3 from '../../assets/banners/Maquina de Solda3.png';
import destaque4 from '../../assets/banners/Maquina de Solda4.png';
import destaque5 from '../../assets/banners/Tocha de Solda1.png';
import destaque6 from '../../assets/banners/Tocha de Solda2.png';
import destaque7 from '../../assets/banners/Tocha de Solda3.png';
import destaque8 from '../../assets/banners/Tocha de Solda4.png';
import Card from './Card';
import {
    SectionDestaqueProducts,
    TitleSection,
    ContentText,
    Top,
    Bottom
} from './styles';


interface DestaqueRequest {
    type: any;
}

const DestaqueProducts = ({ type }: DestaqueRequest) => {


    const data = [
        {
            id: 1,
            img: destaque1,
            img2: destaque8,
            title: 'Maquina de Solda1',
            isNew: true,
            oldPrice: 4000,
            price: 3299
        },
        {
            id: 2,
            img: destaque2,
            img2: destaque7,
            title: 'Tocha de Solda1',
            isNew: true,
            oldPrice: 599,
            price: 499
        },
        {
            id: 3,
            img: destaque3,
            img2: destaque6,
            title: 'Maquina de Solda2',
            isNew: true,
            oldPrice: 7520,
            price: 6299
        },
        {
            id: 4,
            img: destaque4,
            img2: destaque5,
            title: 'Tocha de Solda2',
            isNew: true,
            oldPrice: 800,
            price: 699
        },
        {
            id: 5,
            img: destaque5,
            img2: destaque4,
            title: 'Maquina de Solda3',
            isNew: true,
            oldPrice: 11800,
            price: 10699
        },
        {
            id: 6,
            img: destaque6,
            img2: destaque3,
            title: 'Tocha de Solda3',
            isNew: true,
            oldPrice: 1200,
            price: 999
        },
        {
            id: 7,
            img: destaque7,
            img2: destaque2,
            title: 'Maquina de Solda4',
            isNew: true,
            oldPrice: 10200,
            price: 10499
        },
        {
            id: 8,
            img: destaque8,
            img2: destaque1,
            title: 'Tocha de Solda4',
            isNew: true,
            oldPrice: 659,
            price: 555
        }
    ]

    return (
        <>
            <SectionDestaqueProducts>
                <Top>
                    <TitleSection>Produtos {type}</TitleSection>
                    <ContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ipsum sed ex convallis venenatis nec eu arcu. Duis dolor velit, hendrerit ut lobortis et, rhoncus et mi. Fusce lacus lectus, ullamcorper nec ipsum ut, aliquam vulputate urna. Nulla id libero eget risus luctus semper. Nunc varius dapibus enim in auctor. Sed quam ante, rhoncus quis nisl elementum, finibus dictum tellus. Vivamus eget mattis magna. Vivamus eu dictum metus. Cras id efficitur nisi. Curabitur consequat, nulla quis bibendum gravida, felis nisl vestibulum nibh, et porttitor lectus felis vitae mi. Maecenas nec arcu felis. Praesent condimentum nisi eget dui mollis, in egestas erat suscipit. Ut eu ullamcorper enim. Maecenas at semper turpis. Morbi id orci velit. Maecenas dolor purus, congue in fringilla eu, interdum et libero.
                    </ContentText>
                </Top>
                <Bottom>
                    {data.map(item => (
                        <Card item={item} key={item.id} />
                    ))}
                </Bottom>
            </SectionDestaqueProducts>
        </>
    );
};

export default DestaqueProducts;