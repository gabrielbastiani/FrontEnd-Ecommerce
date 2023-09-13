import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import {
    Variation,
    BlockProductNames,
    BoxAddCart,
    BoxCart,
    BoxContentFrete,
    BoxContentproduct,
    BoxHeartFavorite,
    BoxNotFoundStock,
    ButtonAddCArtProduct,
    ButtonAvalieProduct,
    ButtonContraProposta,
    ButtonEmailStock,
    ContainerVariations,
    ContatinerInfosProduct,
    InputCalculoFrete,
    InputStockEmail,
    TextAvalie,
    TextCredit,
    TextFrete,
    TextIndisponivel,
    TextMax,
    TextMin,
    TextNameProduct,
    TextPrice,
    TextPromotion,
    TextQuantidade,
    TextSku,
    TextStock
} from "./styles";
import { AiFillHeart, AiFillStar, AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { RiAuctionFill } from "react-icons/ri";
import Link from "next/link";
import { ModalLoginAvalie } from "../popups/ModalLoginAvalie";
import { ModalProposta } from "../popups/ModalProposta";
import router from "next/router";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";


interface InfosRequest {
    product_id: string;
    name: string;
    price: number;
    promotion: number;
    sku: string;
    variations: any;
    atribute: any;
    images: any;
    amount: number;
    stock: number;
    weight: number;
    width: number;
    height: number;
    depth: number;
}

const InfosProductPage = ({
    product_id,
    name,
    price,
    promotion,
    sku,
    variations,
    atribute,
    images,
    amount,
    stock,
    weight,
    width,
    height,
    depth
}: InfosRequest) => {

    const { saveProductCart } = useContext(CartContext);

    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    const handleIncrement = (id: string) => {
        setActiveTab(id);
        setCount(count + 1);
    };

    const handleDescrement = (id: string) => {
        setActiveTab(id);
        if (count === 1) {
            return;
        }
        setCount(count - 1);
    };

    function handleAddItemCart(
        product_id: any,
        count: any,
        id: any,
        name: any,
        image: any,
        promotion: any,
        relationattributeproducts: any,
        stock: any,
        weight: any,
        width: any,
        height: any,
        depth: any
    ) {
        let prod = {
            id: id,
            name: name,
            image: image,
            promotion: promotion,
            relationattributeproducts: relationattributeproducts,
            stock: stock,
            weight: weight,
            width: width,
            height: height,
            depth: depth
        }
        /* @ts-ignore */
        saveProductCart(product_id, count, prod)
        setCount(1);
    }

    function addFavoriteProduct() {
        let dados = new Array();

        if (localStorage.hasOwnProperty("@favoriteproduct")) {
            dados = JSON.parse(localStorage.getItem("@favoriteproduct"));
        };

        dados.push(product_id);

        localStorage.setItem("@favoriteproduct", JSON.stringify(dados));

        setTimeout(() => {
            router.reload();
        }, 2000);
    }

    const [productsFavorites, setProductsFavorites] = useState<any[]>([]);

    useEffect(() => {
        let dadosFavorites = localStorage.getItem("@favoriteproduct");

        let arrayFavorites = JSON.parse(dadosFavorites);

        setProductsFavorites(arrayFavorites);
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleProposta, setModalVisibleProposta] = useState(false);

    const handleZipCode = (event: any) => {
        let input = event.target
        input.value = zipCodeMask(input.value)
    }

    const zipCodeMask = (value: any) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return value
    }

    function handleCloseModalLoginAvalie() {
        setModalVisible(false);
    }

    async function handleOpenModalLoginAvalie() {
        setModalVisible(true);
    }

    function handleCloseModalLoginProposta() {
        setModalVisibleProposta(false);
    }

    async function handleOpenModalLoginProposta() {
        setModalVisibleProposta(true);
    }

    Modal.setAppElement('#__next');

    const priceDivisor = promotion / 12;

    const [favoriteFilter, setFavoriteFilter] = useState([]);

    useEffect(() => {
        if (productsFavorites === null) {
            return;
        }
        const favorite = productsFavorites.filter(item => item === product_id);
        setFavoriteFilter(favorite || []);
    }, [productsFavorites, product_id]);

    function removeFavorite() {
        const data = JSON.parse(localStorage.getItem("@favoriteproduct")).filter((item: string) => item != product_id);
        localStorage.setItem("@favoriteproduct", JSON.stringify(data));
        toast.success('Produto favorito excluido da sua lista.');
        setTimeout(() => {
            router.reload();
        }, 2000);
    }

    const [emails, setEmails] = useState('');

    function isEmail(emails: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails);
    };

    async function sendEmailStockProduct() {
        try {
            if (emails === "") {
                toast.error('Insira seu e-mail por favor!');
                return;
            }
            if (!isEmail(emails)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.post('/createStockProductZero', {
                email: emails,
                product_id: product_id
            });

            toast.success('Fique atendo a sua caixa de email ou seu span de email, a qualquer momento o estoque poderá ser restabelecido e avisaremos por lá!');

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
        }
    }

    function slugProduct(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/[/]/g, "-");
    }



    return (
        <>
            {stock < 1 ? (
                <ContatinerInfosProduct>
                    <BlockProductNames>
                        <BoxHeartFavorite>
                            {favoriteFilter?.length < 1 ? (
                                <AiOutlineHeart
                                    cursor='pointer'
                                    size={30}
                                    onClick={addFavoriteProduct}
                                />
                            ) :
                                <AiFillHeart
                                    cursor='pointer'
                                    size={30}
                                    color="red"
                                    onClick={removeFavorite}
                                />
                            }
                        </BoxHeartFavorite>
                        <TextSku>SKU {sku}</TextSku>
                        <TextNameProduct>{name}</TextNameProduct>
                        <ButtonAvalieProduct
                            onClick={handleOpenModalLoginAvalie}
                        >
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <TextAvalie>Avalie</TextAvalie>
                        </ButtonAvalieProduct>
                    </BlockProductNames>

                    <BoxContentproduct>
                        <TextPrice>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)}</TextPrice>
                        <TextPromotion>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(promotion)}</TextPromotion>
                        <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(priceDivisor)} com juros de Cartão de Crédito</TextCredit>
                        <br />
                        <TextPromotion
                            style={{ color: 'red' }}
                        >
                            Produto Indisponivel
                        </TextPromotion>
                    </BoxContentproduct>
                    <TextIndisponivel>Avise-me quando chegar, insira seu e-mail abaixo que recebera<br />uma notificação em seu e-mail qunado o produto estiver em estoque.</TextIndisponivel>
                    <BoxNotFoundStock>
                        <InputStockEmail
                            name='email'
                            placeholder="Seu e-mail aqui..."
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                        />
                        <ButtonEmailStock
                            onClick={sendEmailStockProduct}
                        >
                            AVISAR POR E-MAIL
                        </ButtonEmailStock>
                    </BoxNotFoundStock>
                </ContatinerInfosProduct>
            ) :
                <ContatinerInfosProduct>
                    <BlockProductNames>
                        <BoxHeartFavorite>
                            {favoriteFilter?.length < 1 ? (
                                <AiOutlineHeart
                                    cursor='pointer'
                                    size={30}
                                    onClick={addFavoriteProduct}
                                />
                            ) :
                                <AiFillHeart
                                    cursor='pointer'
                                    size={30}
                                    color="red"
                                    onClick={removeFavorite}
                                />
                            }
                        </BoxHeartFavorite>
                        <TextSku>SKU {sku}</TextSku>
                        <TextNameProduct>{name}</TextNameProduct>
                        <ButtonAvalieProduct
                            onClick={handleOpenModalLoginAvalie}
                        >
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <AiFillStar color="gold" size={20} />
                            <TextAvalie>Avalie</TextAvalie>
                        </ButtonAvalieProduct>
                    </BlockProductNames>

                    <ContainerVariations>
                        {variations.map((item: any, index) => {
                            return (
                                <Link key={index} href={`/produto/${slugProduct(item?.variationProduct)}`}>
                                    <Variation>{item?.variationName}</Variation>
                                </Link>
                            )
                        })}
                    </ContainerVariations>

                    <TextFrete>Aproveite, ainda temos <TextStock>{stock}</TextStock> no estoque.</TextFrete>
                    <br />
                    <br />
                    <BoxContentproduct>
                        <TextPrice>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)}</TextPrice>
                        <TextPromotion>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(promotion)}</TextPromotion>
                        <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(priceDivisor)} com juros de Cartão de Crédito</TextCredit>
                        <ButtonContraProposta
                            onClick={handleOpenModalLoginProposta}
                        >
                            <RiAuctionFill color="white" size={20} />
                            FAZER CONTRAPROPOSTA
                        </ButtonContraProposta>
                    </BoxContentproduct>
                    <BoxAddCart>
                        <BoxCart>
                            <TextMin onClick={() => handleDescrement(product_id)}>-</TextMin>
                            {activeTab === product_id ?
                                <TextQuantidade>{count}</TextQuantidade>
                                :
                                <TextQuantidade>{amount}</TextQuantidade>
                            }
                            <TextMax onClick={() => handleIncrement(product_id)}>+</TextMax>
                        </BoxCart>
                        <ButtonAddCArtProduct
                            /* @ts-ignore */
                            onClick={() => handleAddItemCart(
                                product_id,
                                images,
                                name,
                                count,
                                promotion,
                                atribute,
                                stock,
                                weight,
                                width,
                                height,
                                depth
                            )}
                        >
                            ADICIONAR AO CARRINHO
                        </ButtonAddCArtProduct>
                    </BoxAddCart>

                    <BoxContentFrete>
                        <TextFrete>Calcule o frete e o prazo: </TextFrete>
                        <InputCalculoFrete
                            placeholder="Digite seu CEP"
                            type="text"
                            maxLength={9}
                            onKeyUp={(event) => handleZipCode(event)}
                        />
                        <AiOutlineArrowRight
                            size={23}
                            onClick={() => alert('clicou')}
                        />
                    </BoxContentFrete>

                    <Link href={'https://buscacepinter.correios.com.br/app/endereco/index.php'} target="_blank">NÃO SABE O CEP?</Link>

                </ContatinerInfosProduct>
            }
            {modalVisible && (
                <ModalLoginAvalie
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalLoginAvalie}
                    productId={product_id}
                    productName={name}
                />
            )}
            {modalVisibleProposta && (
                <ModalProposta
                    isOpen={modalVisibleProposta}
                    onRequestClose={handleCloseModalLoginProposta}
                    priceProduct={price}
                    nameProduct={name}
                    skuProduct={sku}
                />
            )}
        </>
    )
};

export default InfosProductPage;