import { PUBLIC_KEY_TEST, URL_NOTIFICATION } from "../../utils/config";
import { FormEvent, useContext, useEffect, useState } from "react";
import { canSSRAuthPayment } from "../../utils/canSSRAuthPayment";
import { setupAPIClient } from "../../services/api";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { HeaderCart } from "../../components/HeaderCart";
import Head from "next/head";
import FooterAccount from "../../components/FooterAccount";
import logoCorreios from "../../assets/correios-logo.png";
import boleto from "../../assets/pagamento-boleto.png";
import cartao from "../../assets/pagamento-cartao.png";
import pix from "../../assets/pagamento-pix.png";
import {
    AddressTextIcon,
    AmountProduct,
    BackButton,
    BoxButtons,
    BoxButtonsData,
    BoxButtonsFunctions,
    BoxCupom,
    BoxCupomPayment,
    BoxData,
    BoxDataProductPayment,
    BoxDelivery,
    BoxDeliverySelected,
    BoxIconsPayment,
    BoxInputs,
    BoxPayment,
    BoxPricesPayment,
    BoxProductPayment,
    BoxTitle,
    ButtonDelivery,
    ButtonRemove,
    ButtonsData,
    ContainerFechamento,
    Datas,
    Days,
    DeliverySpan,
    DestinyName,
    EditDelivery,
    FormPayBoletPix,
    ImageProductPayment,
    InputDelivery,
    PayIcon,
    SectionPayment,
    TextCupom,
    TextCupomStrong,
    TextCurrent,
    TextCurrentBold,
    TextCurrentInput
} from "./styles";
import Titulos from "../../components/Titulos";
import {
    AiFillEdit,
    AiOutlineCompass,
    AiOutlineMail,
    AiOutlinePaperClip
} from "react-icons/ai";
import {
    BsFillArrowLeftSquareFill,
    BsFillCheckCircleFill,
    BsFillPersonFill,
    BsGenderTrans,
    BsTelephoneFill
} from "react-icons/bs";
import { FaBirthdayCake, FaIdCard } from "react-icons/fa";
import { Input } from "../../components/ui/Input";
import { IMaskInput } from "react-imask";
import { FiEdit } from "react-icons/fi";
import Modal from 'react-modal';
import { ModalDeliveryEdit } from "../../components/popups/ModalDeliveryEdit";
import { BiCircle } from "react-icons/bi";
import router from "next/router";
import Image from "next/image";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import SelectUpdate from "../../components/ui/SelectUpdate";
import {
    AtributeProduct,
    BoxFinalCart,
    BoxPricesFinal,
    BoxPricesTotalProduct,
    More,
    NameProduct,
    PriceProduct,
    PriceProductData,
    SubTotal,
    Total,
    ValuesMore
} from "../carrinho/styles";
import { Button } from "../../components/ui/Button";
import Router from "next/router";


type CepProps = {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

type CuoponProps = {
    name: string;
    code: string;
}

export default function Payment() {
    /* @ts-ignore */
    const { newSubTotalCart, newDataProducts, cartProducts, productsCart, totalCart, totalFinishCart, dataTotalCart, cupomPayment, fretePayment, fretePaymentCoupon } = useContext(CartContext);
    const { customer, signOutPayment, isAuthenticated } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [paymentCupom, setPaymentCupom] = useState(cupomPayment);
    const [searchAddress, setSearchAddress] = useState<CepProps>();
    const [searchAddressEdit, setSearchAddressEdit] = useState<CepProps>();
    const [daysDelivery, setDaysDelivery] = useState('');

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [ceps, setCeps] = useState('');
    const [store, setStore] = useState("");

    const [deliverysCustomer, setDeliverysCustomer] = useState<any[]>([]);

    const [idSelected, setIdSelected] = useState("");
    const [addresseeSelected, setAddresseeSelected] = useState("");
    const [addressSelected, setAddressSelected] = useState("");
    const [numeroSelected, setNumeroSelected] = useState("");
    const [citySelected, setCitySelected] = useState("");
    const [estadosSelected, setEstadosSelected] = useState("");
    const [bairroSelected, setBairroSelected] = useState("");
    const [cepSelected, setCepSelected] = useState("");
    const [referenceSelected, setReferenceSelected] = useState("");
    const [complementSelected, setComplementSelected] = useState("");

    const [cepBusca, setCepBusca] = useState("");

    const [deliveryEdits, setDeliveryEdits] = useState(false);

    const [allDeliverys, setAllDeliverys] = useState(false);
    const [cepLoad, setCepLoad] = useState(false);
    const [cepLoadEdit, setCepLoadEdit] = useState(false);
    const [newDelivery, setNewDelivery] = useState(false);
    const [editCustomer, setEditCustomer] = useState(false);
    const [removeCupom, setRemoveCupom] = useState(false);

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

    const [dataFrete, setDataFrete] = useState<any[]>([]);

    const [cupomCustomer, setCupomCustomer] = useState<CuoponProps>();

    const [desconto, setDesconto] = useState("");
    const [totalDesconto, setTotalDesconto] = useState("");
    const [newPriceArray, setNewPriceArray] = useState<any[]>([]);
    const [zero, setZero] = useState(100);
    const [freteCupom, setFreteCupom] = useState(Number);
    const [newSubTotalPrice, setNewSubTotalPrice] = useState(Number);
    const [codePromotion, setCodePromotion] = useState("");

    const [activePayment, setActivePayment] = useState("");
    const [colorPay, setColorPay] = useState("");

    let typesPayment = [
        {
            id: "boleto",
            icon_pay: boleto,
            pay_name: "Boleto"
        },
        {
            id: "cartao_de_credito",
            icon_pay: cartao,
            pay_name: "Cartão de Crédito"
        },
        {
            id: "pix",
            icon_pay: pix,
            pay_name: "PIX"
        }
    ];

    const handleChosePayment = (id: string) => {
        setActivePayment(id);
        setColorPay(id);
        loadMercadoPago();
    };

    function isEmail(emails: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails)
    };

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value)
    }

    const handleDelivery = () => {
        setDeliveryEdits(!deliveryEdits);
    }

    const handleAllDeliverys = () => {
        setAllDeliverys(!allDeliverys);
    }

    const handleCep = () => {
        setCepLoad(!cepLoad);
    }

    const handleCepEdit = () => {
        setCepLoadEdit(!cepLoadEdit);
    }

    const handleNewDelivery = () => {
        setNewDelivery(!newDelivery);
    }

    const handleEditCustomer = () => {
        setEditCustomer(!editCustomer);
    }

    const handleRemoveCupom = () => {
        setRemoveCupom(!removeCupom);
    }

    const cpfCnpj = cpfs ? cpfs : cnpjs;

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/-{2,}/g, "")
            .replace(".", "")
            .replace(".", "")
            .replace("/", "")
            .replace("-", "")
    }

    const tipo = removerAcentos(cpfCnpj).length >= 14 ? "CNPJ" : "CPF";

    async function newCustomer() {
        signOutPayment();
    }

    async function loadCep() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setSearchAddress(response?.data);
            handleCep();
        } catch (error) {
            console.log(error)
        }
    }

    async function loadCepEdit() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setSearchAddressEdit(response?.data);
            handleCepEdit();
        } catch (error) {
            console.log(error)
        }
    }

    function closenewDelivery() {
        handleNewDelivery();
        handleCep();
    }

    useEffect(() => {
        async function loadCustomerData() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

                setNameCompletes(data?.name || "");
                setCnpjs(data?.cnpj || "");
                setCpfs(data?.cpf || "");
                setStateRegistration(data?.stateRegistration || "");
                setPhones(data?.phone || "");
                setEmails(data?.email || "");
                setDataNascimentos(data?.dateOfBirth || "");
                setLocals(data?.address || "");
                setNumeros(data?.number || "");
                setBairros(data?.neighborhood || "");
                setCidades(data?.city || "");
                setEstados(data?.state || "");
                setCeps(data?.cep || "");
                setStore(data?.store?.name || "");
                setGeneros(data?.gender || "");

                setPaymentCupom(cupomPayment || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadCustomerData();
    }, [customer_id]);

    useEffect(() => {
        async function lastDeliveryCustomer() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/customer/delivery/findFirstDelivery?customer_id=${customer_id}`);
                setIdSelected(data?.id);
                setAddressSelected(data?.address);
                setAddresseeSelected(data?.addressee);
                setNumeroSelected(data?.number);
                setBairroSelected(data?.neighborhood);
                setCitySelected(data?.city);
                setEstadosSelected(data?.state);
                setCepSelected(data?.cep);
                setReferenceSelected(data?.reference);
                setComplementSelected(data?.complement);
            } catch (error) {
                console.log(error)
            }
        }
        lastDeliveryCustomer();
    }, [customer_id]);

    useEffect(() => {
        async function deliverys() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/customer/findAlldeliveryCustomer?customer_id=${customer_id}`);
                setDeliverysCustomer(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        deliverys();
    }, [customer_id]);

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateNameCustomer?customer_id=${customer_id}`, { name: nameCompletes });

                toast.success('Nome atualizado com sucesso.');

                setTimeout(() => {
                    router.reload();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateDataCustomer() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, {
                cpf: cpfs,
                cnpj: cnpjs,
                stateRegistration: stateRegistration,
                phone: phones,
                dateOfBirth: dataNascimentos,
                gender: generoSelected,
            });

            toast.success('Dado atualizado com sucesso.');

            setTimeout(() => {
                router.reload();
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado.');
        }
    }

    async function updateEmail() {
        try {
            const apiClient = setupAPIClient();
            if (!isEmail(emails)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            if (emails === '') {
                toast.error('Não deixe o email em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                setTimeout(() => {
                    router.reload();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    useEffect(() => {
        async function loadCupom() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/getCouponCart?code=${cupomPayment}`);
                setCupomCustomer(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCupom();
    }, [cupomPayment]);

    async function removeCupomPayment() {
        try {
            const apiClient = setupAPIClient();
            const storageId = String(cartProducts[0]?.store_cart_id);
            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + fretePayment
            });

            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                frete_coupon: 0,
                coupon: null,
                new_subTotal: 0,
                new_value_products: []
            });

            toast.success("Você removeu o cupom aplicado para esse pedido");

            setTimeout(() => {
                router.reload();
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    var formatedDesconto = String(totalDesconto);
    formatedDesconto = formatedDesconto + '';
    /* @ts-ignore */
    formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
    formatedDesconto = formatedDesconto + '';
    formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");

    if (formatedDesconto.length > 6) {
        formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (formatedDesconto == 'NaN') formatedDesconto = '';
    const descontoFormated = formatedDesconto.replace(".", "");
    const formatedDescontoPonto = descontoFormated.replace(",", ".");
    const formatedCupom = Number(formatedDescontoPonto);

    var freteFormat = String(dataFrete[0]?.Valor);
    freteFormat = freteFormat + '';
    /* @ts-ignore */
    freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
    freteFormat = freteFormat + '';
    freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

    if (freteFormat.length > 6) {
        freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (freteFormat == 'NaN') freteFormat = '';
    const formatedPrice = freteFormat.replace(".", "");
    const formatedPricePonto = formatedPrice.replace(",", ".");
    const formatedFrete = Number(formatedPricePonto);

    let dadosFrete: any = [];
    (productsCart || []).forEach((item) => {
        dadosFrete.push({
            "peso": item?.product?.weight * item?.amount,
            "comprimento": item.product?.depth * item?.amount,
            "altura": item?.product?.height * item?.amount,
            "largura": item?.product?.width * item?.amount
        });
    });

    var totalPeso = 0;
    var totalComprimento = 0;
    var totalAltura = 0;
    var totalLargura = 0;

    for (var i = 0; i < dadosFrete.length; i++) {
        totalPeso += dadosFrete[i].peso;
        totalComprimento += dadosFrete[i].comprimento;
        totalAltura += dadosFrete[i].altura;
        totalLargura += dadosFrete[i].largura;
    }

    useEffect(() => {
        async function deliveryDays() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.post('/freteCalculo', {
                    nCdServico: "04162",
                    sCepDestino: String(cepSelected),
                    nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                    nCdFormato: 1,
                    nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                    nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                    nVlLargura: totalLargura > 82 ? 81 : totalLargura
                });

                setDaysDelivery(data[0]?.PrazoEntrega);

            } catch (error) {
                console.log(error);
            }
        }
        deliveryDays()
    }, [cepSelected]);

    async function updateCurrentDelivery(customer_id: string, id: string, cep: string) {

        if (cupomPayment) {
            toast.error("Primeiramente retire o cupom que esta aplicado, e altere o endereço de entrega para o desejado, e depois insira o cupom novamente")
            return;
        }

        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateCurrentDelivery?customer_id=${customer_id}&deliveryAddressCustomer_id=${id}`);

            const cepfrete = cep;
            /* @ts-ignore */
            dataTotalCart(cepfrete);

            const { data } = await apiClient.post('/freteCalculo', {
                nCdServico: "04162",
                sCepDestino: cepfrete,
                nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                nCdFormato: 1,
                nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                nVlLargura: totalLargura > 82 ? 81 : totalLargura
            });

            var freteFormat = data[0]?.Valor;
            freteFormat = freteFormat + '';
            /* @ts-ignore */
            freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
            freteFormat = freteFormat + '';
            freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

            if (freteFormat.length > 6) {
                freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (freteFormat == 'NaN') freteFormat = '';
            const formatedPrice = freteFormat.replace(".", "");
            const formatedPricePonto = formatedPrice.replace(",", ".");
            const formatedFrete = Number(formatedPricePonto);

            const frete = formatedFrete;

            const storageId = String(cartProducts[0]?.store_cart_id);
            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            toast.success('Endereço de entrega escolhido com sucesso')

            setTimeout(() => {
                router.reload();
            }, 3000);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updateDestinySelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                addressee: addresseeSelected,
            });
            toast.success("Destinatario do endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateAddressSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                address: searchAddressEdit?.logradouro ? searchAddressEdit?.logradouro : addressSelected
            });
            toast.success("Endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateNumberSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                number: numeroSelected
            });
            toast.success("Número do endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateComplementSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                complement: complementSelected
            });
            toast.success("Complemento do endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateBairroSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                neighborhood: searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected
            });
            toast.success("Bairro de endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateReferenceSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                reference: referenceSelected
            });
            toast.success("Referencia do endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateSelectedDelivery() {

        if (cupomPayment) {
            toast.error("Primeiramente retire o cupom que esta aplicado, altere o CEP conforme deseja, e depois insira o cupom novamente")
            return;
        }

        const apiClient = setupAPIClient();
        const cep = searchAddressEdit?.cep;
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                cep: searchAddressEdit?.cep,
                neighborhood: searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected,
                city: searchAddressEdit?.localidade,
                state: searchAddressEdit?.uf
            });

            const { data } = await apiClient.post('/freteCalculo', {
                nCdServico: "04162",
                sCepDestino: cep,
                nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                nCdFormato: 1,
                nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                nVlLargura: totalLargura > 82 ? 81 : totalLargura
            });

            var freteFormat = data[0]?.Valor;
            freteFormat = freteFormat + '';
            /* @ts-ignore */
            freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
            freteFormat = freteFormat + '';
            freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

            if (freteFormat.length > 6) {
                freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (freteFormat == 'NaN') freteFormat = '';
            const formatedPrice = freteFormat.replace(".", "");
            const formatedPricePonto = formatedPrice.replace(",", ".");
            const formatedFrete = Number(formatedPricePonto);

            const frete = formatedFrete;
            const cepfrete = cep;

            const storageId = String(cartProducts[0]?.store_cart_id);
            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            toast.success("Endereço atual alterado com sucesso");

            handleDelivery();

            setTimeout(() => {
                router.reload();
            }, 2500);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleNewDeliveryCustomer() {

        if (cupomPayment) {
            toast.error("Primeiramente retire o cupom que esta aplicado, cadastre esse novo endereço, e depois insira o cupom novamente")
            return;
        }

        const cep = searchAddress?.cep;
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/customer/delivery/createDeliveryAddress`, {
                customer_id: customer_id,
                addressee: addresseeSelected,
                address: searchAddress?.logradouro,
                number: numeroSelected,
                neighborhood: searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro",
                complement: complementSelected,
                reference: referenceSelected,
                cep: searchAddress?.cep,
                city: searchAddress?.localidade,
                state: searchAddress?.uf
            });

            const { data } = await apiClient.post('/freteCalculo', {
                nCdServico: "04162",
                sCepDestino: cep,
                nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                nCdFormato: 1,
                nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                nVlLargura: totalLargura > 82 ? 81 : totalLargura
            });

            var freteFormat = data[0]?.Valor;
            freteFormat = freteFormat + '';
            /* @ts-ignore */
            freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
            freteFormat = freteFormat + '';
            freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

            if (freteFormat.length > 6) {
                freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (freteFormat == 'NaN') freteFormat = '';
            const formatedPrice = freteFormat.replace(".", "");
            const formatedPricePonto = formatedPrice.replace(",", ".");
            const formatedFrete = Number(formatedPricePonto);

            const frete = formatedFrete;

            const cepfrete = cep;

            const storageId = String(cartProducts[0]?.store_cart_id);
            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            toast.success("Novo endereço cadastrado com sucesso");

            closenewDelivery();

            setTimeout(() => {
                router.reload();
            }, 2500);

        } catch (error) {
            console.log(error);
        }
    }

    async function loadCupomCode() {

        if (cupomPayment) {
            toast.error("Retire o cupom atual antes de aplicar um outro cupom");
            return;
        }

        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);
            const storageId = String(cartProducts[0]?.store_cart_id);

            if (data === null) {
                toast.error("Não ha cupom promocional ativo, ou com esse nome.");
                return;
            }

            /*"Valor de desconto (Produto(s) selecionado(s) para essa promoção)", value: "productsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "productsValue") {

                const cartArray = productsCart.map(item => item?.product_id);
                const productId = data?.cupomsproducts.map((item: { product_id: any; }) => item?.product_id);

                var cupomOkValue: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (productId.indexOf(cartArray[i]) > -1) {
                        cupomOkValue.push(cartArray[i]);
                    }
                }

                if (cupomOkValue?.length === 0) {
                    toast.error('Nenhum dos produtos no carrinho de compras estão dentro dessa promoção.');
                } else {

                    let newCartValue = productsCart.reduce((acc, o) => {
                        let obj = cupomOkValue.includes(o?.product_id) ? Object.assign(
                            o, { price: o?.product?.promotion - data?.coupomsconditionals[0]?.value }) : o

                        acc.push(obj);

                        return acc;
                    }, []);

                    let valuesProducts: any = [];
                    (newCartValue || []).forEach((item) => {
                        valuesProducts.push({
                            "preco": item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount
                        });
                    });

                    var totalPriceDesconto = 0;
                    for (var i = 0; i < valuesProducts.length; i++) {
                        totalPriceDesconto += valuesProducts[i].preco;
                    }

                    const result = fretePayment + totalPriceDesconto;
                    const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    const frete = fretePayment;
                    const frete_coupon = fretePayment;
                    const cepfrete = cepSelected;
                    const code = codePromotion;
                    const subTot = totalPriceDesconto;
                    const newvalue = newCartValue;
                    /* @ts-ignore */
                    dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                    setTotalDesconto(formated);
                    setNewPriceArray(newvalue);
                    setNewSubTotalPrice(subTot);

                    var formatedDesconto = String(formated);
                    formatedDesconto = formatedDesconto + '';
                    /* @ts-ignore */
                    formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                    formatedDesconto = formatedDesconto + '';
                    formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                    if (formatedDesconto.length > 6) {
                        formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                    }
                    if (formatedDesconto == 'NaN') formatedDesconto = '';
                    const descontoFormated = formatedDesconto.replace(".", "");
                    const formatedDescontoPonto = descontoFormated.replace(",", ".");
                    const formatedCupom = Number(formatedDescontoPonto);

                    await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                        totalCartFinish: formatedCupom
                    });

                    toast.success("Cupom aplicado com sucesso!");

                    setTimeout(() => {
                        Router.reload()
                    }, 2000);

                }

                return;
            }

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {

                const cartArray = productsCart.map(item => item?.product_id);

                var cupomOkValue: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (cartArray.indexOf(cartArray[i]) > -1) {
                        cupomOkValue.push(cartArray[i]);
                    }
                }

                let newCartValue = productsCart.reduce((acc, o) => {
                    let obj = cupomOkValue.includes(o?.product_id) ? Object.assign(
                        o, { price: o?.product?.promotion - data?.coupomsconditionals[0]?.value }) : o

                    acc.push(obj);

                    return acc;
                }, []);

                let productsValue: any = [];
                (newCartValue || []).forEach((item) => {
                    productsValue.push({
                        "preco": item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount
                    });
                });

                var descontoPriceTotal = 0;
                for (var i = 0; i < productsValue.length; i++) {
                    descontoPriceTotal += productsValue[i].preco;
                }

                const result = fretePayment + descontoPriceTotal;
                const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = fretePayment;
                const frete_coupon = fretePayment;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = descontoPriceTotal;
                const newvalue = newCartValue;
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setTotalDesconto(formated);
                setNewPriceArray(newvalue);
                setNewSubTotalPrice(subTot);

                var formatedDesconto = String(formated);
                formatedDesconto = formatedDesconto + '';
                /* @ts-ignore */
                formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                formatedDesconto = formatedDesconto + '';
                formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                if (formatedDesconto.length > 6) {
                    formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                }
                if (formatedDesconto == 'NaN') formatedDesconto = '';
                const descontoFormated = formatedDesconto.replace(".", "");
                const formatedDescontoPonto = descontoFormated.replace(",", ".");
                const formatedCupom = Number(formatedDescontoPonto);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Valor de desconto no valor total", value: "totalValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalValue") {
                const valueDescont = totalCart - data?.coupomsconditionals[0]?.value;
                const valueMore = valueDescont + fretePayment;
                const formated = valueMore.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = fretePayment;
                const frete_coupon = fretePayment;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setTotalDesconto(formated);

                var formatedDesconto = String(formated);
                formatedDesconto = formatedDesconto + '';
                /* @ts-ignore */
                formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                formatedDesconto = formatedDesconto + '';
                formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                if (formatedDesconto.length > 6) {
                    formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                }
                if (formatedDesconto == 'NaN') formatedDesconto = '';
                const descontoFormated = formatedDesconto.replace(".", "");
                const formatedDescontoPonto = descontoFormated.replace(",", ".");
                const formatedCupom = Number(formatedDescontoPonto);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {
                const zeroFrete = fretePayment - (fretePayment * zero / 100);

                const frete = fretePayment;
                const frete_coupon = 0;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setZero(zeroFrete);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {
                const valueFrete = fretePayment - data?.coupomsconditionals[0]?.value;

                const frete = fretePayment;
                const frete_coupon = valueFrete;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setFreteCupom(valueFrete);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + frete_coupon
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {
                const percentShipping = fretePayment - (fretePayment * data?.coupomsconditionals[0]?.value / 100);

                const frete = fretePayment;
                const frete_coupon = percentShipping;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setFreteCupom(percentShipping);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + frete_coupon
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentProduct") {

                const cartArray = productsCart.map(item => item?.product_id);
                const productId = data?.cupomsproducts.map((item: { product_id: any; }) => item?.product_id);

                var cupomOk: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (productId.indexOf(cartArray[i]) > -1) {
                        cupomOk.push(cartArray[i]);
                    }
                }

                if (cupomOk?.length === 0) {
                    toast.error('Nenhum dos produtos no carrinho de compras estão dentro dessa promoção.');
                } else {

                    let newCart = productsCart.reduce((acc, o) => {
                        let obj = cupomOk.includes(o?.product_id) ? Object.assign(
                            o, { price: o?.product?.promotion - (o?.product?.promotion * data?.coupomsconditionals[0]?.value / 100) }) : o;
                        acc.push(obj);
                        return acc;
                    }, []);

                    let valuesProducts: any = [];
                    (newCart || []).forEach((item) => {
                        valuesProducts.push({
                            "preco": item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount
                        });
                    });

                    var totalPriceDesconto = 0;
                    for (var i = 0; i < valuesProducts.length; i++) {
                        totalPriceDesconto += valuesProducts[i].preco;
                    }

                    const result = fretePayment + totalPriceDesconto;
                    const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    const frete = fretePayment;
                    const frete_coupon = fretePayment;
                    const cepfrete = cepSelected;
                    const code = codePromotion;
                    const subTot = totalPriceDesconto;
                    const newvalue = newCart;
                    /* @ts-ignore */
                    dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);

                    setTotalDesconto(formated);
                    setNewSubTotalPrice(subTot);
                    setNewPriceArray(newvalue);

                    var formatedDesconto = String(formated);
                    formatedDesconto = formatedDesconto + '';
                    /* @ts-ignore */
                    formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                    formatedDesconto = formatedDesconto + '';
                    formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                    if (formatedDesconto.length > 6) {
                        formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                    }
                    if (formatedDesconto == 'NaN') formatedDesconto = '';
                    const descontoFormated = formatedDesconto.replace(".", "");
                    const formatedDescontoPonto = descontoFormated.replace(",", ".");
                    const formatedCupom = Number(formatedDescontoPonto);

                    await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                        totalCartFinish: formatedCupom
                    });

                    toast.success("Cupom aplicado com sucesso!");

                    setTimeout(() => {
                        Router.reload();
                    }, 2700);

                    return;
                }

            }

            /*"Percentual de desconto no valor total", value: "totalPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalPercent") {
                const maisCart = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                const totalPercentStore = fretePayment + maisCart;

                const formated = totalPercentStore.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = fretePayment;
                const frete_coupon = fretePayment;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);
                setTotalDesconto(formated);

                var formatedDesconto = String(formated);
                formatedDesconto = formatedDesconto + '';
                /* @ts-ignore */
                formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                formatedDesconto = formatedDesconto + '';
                formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                if (formatedDesconto.length > 6) {
                    formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                }
                if (formatedDesconto == 'NaN') formatedDesconto = '';
                const descontoFormated = formatedDesconto.replace(".", "");
                const formatedDescontoPonto = descontoFormated.replace(",", ".");
                const formatedCupom = Number(formatedDescontoPonto);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {

                const cartArray = productsCart.map(item => item?.product_id);

                var cupomOkValue: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (cartArray.indexOf(cartArray[i]) > -1) {
                        cupomOkValue.push(cartArray[i]);
                    }
                }

                let newCartValue = productsCart.reduce((acc, o) => {
                    let obj = cupomOkValue.includes(o?.product_id) ? Object.assign(
                        o, { price: o?.product?.promotion - (o?.product?.promotion * data?.coupomsconditionals[0]?.value / 100) }) : o;

                    acc.push(obj);

                    return acc;
                }, []);

                let valuesProducts: any = [];
                (newCartValue || []).forEach((item) => {
                    valuesProducts.push({
                        "preco": item?.product?.promotion * item?.amount - (item?.product?.promotion * item?.amount * data?.coupomsconditionals[0]?.value / 100)
                    });
                });

                var totalPriceDesconto = 0;
                for (var i = 0; i < valuesProducts.length; i++) {
                    totalPriceDesconto += valuesProducts[i].preco;
                }

                const result = fretePayment + totalPriceDesconto;
                const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = fretePayment;
                const frete_coupon = fretePayment;
                const cepfrete = cepSelected;
                const code = codePromotion;
                const subTot = totalPriceDesconto;
                const newvalue = newCartValue;
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, code, frete_coupon, subTot, newvalue);

                setNewPriceArray(newvalue);
                setNewSubTotalPrice(subTot);
                setTotalDesconto(formated);

                var formatedDesconto = String(formated);
                formatedDesconto = formatedDesconto + '';
                /* @ts-ignore */
                formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
                formatedDesconto = formatedDesconto + '';
                formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");
                if (formatedDesconto.length > 6) {
                    formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                }
                if (formatedDesconto == 'NaN') formatedDesconto = '';
                const descontoFormated = formatedDesconto.replace(".", "");
                const formatedDescontoPonto = descontoFormated.replace(",", ".");
                const formatedCupom = Number(formatedDescontoPonto);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                toast.success("Cupom aplicado com sucesso!");

                setTimeout(() => {
                    Router.reload();
                }, 2700);

                return;
            }

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModal(id: string) {
        const apiClient = setupAPIClient();
        const { data } = await apiClient.get(`/customer/delivery/findUniqueDelivery?deliveryAddressCustomer_id=${id}`);
        setModalItem(data);
        setModalVisible(true);
    }

    Modal.setAppElement('#__next');



    /* CARTÃO DE CRÉDITO */

    let valuePay = String(totalFinishCart.toFixed(2));

    useEffect(() => {
        const initializeMercadoPago = async () => {
            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            console.log(valuePay)

            const cardForm = mp.cardForm({
                amount: valuePay,
                iframe: true,
                form: {
                    id: "form-checkout",
                    cardNumber: {
                        id: "form-checkout__cardNumber",
                        placeholder: "Número do cartão",
                    },
                    expirationDate: {
                        id: "form-checkout__expirationDate",
                        placeholder: "MM/YY",
                    },
                    securityCode: {
                        id: "form-checkout__securityCode",
                        placeholder: "Código de segurança",
                    },
                    cardholderName: {
                        id: "form-checkout__cardholderName",
                        placeholder: "Titular do cartão",
                    },
                    issuer: {
                        id: "form-checkout__issuer",
                        placeholder: "Banco emissor",
                    },
                    installments: {
                        id: "form-checkout__installments",
                        placeholder: "Parcelas",
                    },
                    identificationType: {
                        id: "form-checkout__identificationType",
                        placeholder: "Tipo de documento",
                    },
                    identificationNumber: {
                        id: "form-checkout__identificationNumber",
                        placeholder: "Número do documento",
                    },
                    cardholderEmail: {
                        id: "form-checkout__cardholderEmail",
                        placeholder: "E-mail",
                    },
                },
                callbacks: {
                    onFormMounted: error => {
                        if (error) return console.warn("Form Mounted handling error: ", error);
                        console.log("Form mounted");
                    },
                    onSubmit: event => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType
                        } = cardForm.getCardFormData();

                        try {
                            fetch("http://localhost:3333/paymentCardResult", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: Number(amount),
                                    installments: Number(installments),
                                    description: store,
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                    metadata: {
                                        customer_id: customer_id,
                                        delivery_id: idSelected,
                                        order_data_delivery: daysDelivery,
                                        cupom: cupomPayment,
                                        store_cart_id: cartProducts[0]?.store_cart_id
                                    },
                                    notification_url: URL_NOTIFICATION
                                }),
                            });

                        } catch (error) {
                            console.error("Erro ao fazer a requisição:", error);
                        }
                    },
                    onFetching: (resource) => {
                        console.log("Fetching resource: ", resource);

                        // Animate progress bar
                        const progressBar = document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    }
                },
            });

        };

        initializeMercadoPago();

    }, [valuePay]);



    /* BOLETO BANCÁRIO */

    async function handleRegisterBoleto(event: FormEvent) {
        event.preventDefault();
        try {
            fetch("http://localhost:3333/paymentBoletoResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                },
                body: JSON.stringify({
                    transaction_amount: Number(totalFinishCart.toFixed(2)),
                    description: store,
                    payment_method_id: 'bolbradesco',
                    payer: {
                        first_name: nameCompletes,
                        last_name: nameCompletes,
                        email: emails,
                        identification: {
                            number: removerAcentos(cpfCnpj),
                            type: tipo
                        },
                        address: {
                            zip_code: removerAcentos(ceps),
                            street_name: locals,
                            street_number: numeros,
                            neighborhood: bairros,
                            city: cidades,
                            federal_unit: estados
                        }
                    },
                    metadata: {
                        customer_id: customer_id,
                        delivery_id: idSelected,
                        order_data_delivery: daysDelivery,
                        cupom: cupomPayment,
                        store_cart_id: cartProducts[0]?.store_cart_id
                    },
                    notification_url: URL_NOTIFICATION
                }),
            });

            Router.push('/thanks');

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }


    /* PIX */

    async function handleRegisterPix(event: FormEvent) {
        event.preventDefault();
        try {
            fetch("http://localhost:3333/paymentPixResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                },
                body: JSON.stringify({
                    transaction_amount: Number(totalFinishCart.toFixed(2)),
                    description: store,
                    payment_method_id: 'pix',
                    payer: {
                        email: emails,
                        first_name: nameCompletes,
                        last_name: nameCompletes,
                        identification: {
                            type: tipo,
                            number: removerAcentos(cpfCnpj)
                        },
                        address: {
                            zip_code: removerAcentos(ceps),
                            street_name: locals,
                            street_number: numeros,
                            neighborhood: bairros,
                            city: cidades,
                            federal_unit: estados
                        }
                    },
                    metadata: {
                        customer_id: customer_id,
                        delivery_id: idSelected,
                        order_data_delivery: daysDelivery,
                        cupom: cupomPayment,
                        store_cart_id: cartProducts[0]?.store_cart_id
                    },
                    notification_url: URL_NOTIFICATION
                }),
            });

            Router.push('/thanks');

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }


    return (
        <>
            <Head>
                <title>Pagamento</title>
            </Head>

            <HeaderCart />

            <SectionPayment>
                <ContainerFechamento>
                    <BoxPayment>
                        {editCustomer ?
                            <>
                                <Titulos tipo="h2" titulo="Editar Informações Pessoais" />
                                <br />
                                <BoxData>
                                    <BsFillPersonFill color="black" size={20} />
                                    &nbsp;
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={nameCompletes}
                                                type="text"
                                                placeholder={nameCompletes}
                                                value={nameCompletes}
                                                onChange={(e) => setNameCompletes(e.target.value)}
                                                handleSubmit={updateName}
                                            />
                                        }
                                    />
                                </BoxData>
                                <BoxData>
                                    <AiOutlineMail color="black" size={20} />
                                    &nbsp;
                                    <TextoDados
                                        chave={"E-mail"}
                                        dados={
                                            <InputUpdate
                                                dado={emails}
                                                type="text"
                                                placeholder={emails}
                                                value={emails}
                                                onChange={(e) => setEmails(e.target.value)}
                                                handleSubmit={updateEmail}
                                            />
                                        }
                                    />
                                </BoxData>
                                <BoxData>
                                    <BsTelephoneFill color="black" size={20} />
                                    &nbsp;
                                    <TextoDados
                                        chave={"Telefone"}
                                        dados={
                                            <InputUpdate
                                                dado={phones}
                                                type="text"
                                                /* @ts-ignore */
                                                as={IMaskInput}
                                                mask="(00) 0000-0000"
                                                placeholder={phones}
                                                value={phones}
                                                onChange={(e) => setPhones(e.target.value)}
                                                handleSubmit={updateDataCustomer}
                                            />
                                        }
                                    />
                                </BoxData>

                                {cnpjs ?
                                    <>
                                        <BoxData>
                                            <FaIdCard color="black" size={20} />
                                            &nbsp;
                                            <TextoDados
                                                chave={"CNPJ"}
                                                dados={
                                                    <InputUpdate
                                                        dado={cnpjs}
                                                        /* @ts-ignore */
                                                        as={IMaskInput}
                                                        mask="00.000.000/0000-00"
                                                        type="text"
                                                        placeholder={cnpjs}
                                                        value={cnpjs}
                                                        onChange={(e) => setCnpjs(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BoxData>
                                        <BoxData>
                                            <AiOutlinePaperClip color="black" size={20} />
                                            &nbsp;
                                            <TextoDados
                                                chave={"Inscrição estadual"}
                                                dados={
                                                    <InputUpdate
                                                        dado={stateRegistration}
                                                        type="text"
                                                        placeholder={stateRegistration}
                                                        value={stateRegistration}
                                                        onChange={(e) => setStateRegistration(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BoxData>
                                    </>
                                    :
                                    null
                                }

                                {cpfs ?
                                    <>
                                        <BoxData>
                                            <FaIdCard color="black" size={20} />
                                            &nbsp;
                                            <TextoDados
                                                chave={"CPF"}
                                                dados={
                                                    <InputUpdate
                                                        dado={cpfs}
                                                        /* @ts-ignore */
                                                        as={IMaskInput}
                                                        mask="000.000.000-00"
                                                        type="text"
                                                        placeholder={cpfs}
                                                        value={cpfs}
                                                        onChange={(e) => setCpfs(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BoxData>
                                        <BoxData>
                                            <BsGenderTrans color="black" size={20} />
                                            &nbsp;
                                            <TextoDados
                                                chave={"Gênero"}
                                                dados={
                                                    <SelectUpdate
                                                        dado={generos}
                                                        value={generoSelected}
                                                        /* @ts-ignore */
                                                        onChange={handleChangeGenero}
                                                        opcoes={
                                                            [
                                                                { label: "Selecionar...", value: "" },
                                                                { label: "Masculino", value: "Masculino" },
                                                                { label: "Feminino", value: "Feminino" },
                                                                { label: "Outro", value: "Outro" },
                                                            ]
                                                        }
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BoxData>
                                        <BoxData>
                                            <FaBirthdayCake color="black" size={20} />
                                            &nbsp;
                                            <TextoDados
                                                chave={"Data de nascimento"}
                                                dados={
                                                    <InputUpdate
                                                        dado={dataNascimentos}
                                                        type="text"
                                                        /* @ts-ignore */
                                                        as={IMaskInput}
                                                        mask="00/00/0000"
                                                        placeholder={dataNascimentos}
                                                        value={dataNascimentos}
                                                        onChange={(e) => setDataNascimentos(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BoxData>
                                    </>
                                    :
                                    null
                                }

                                <BoxButtonsData>
                                    <ButtonsData
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        onClick={handleEditCustomer}
                                    >
                                        Cancelar
                                    </ButtonsData>
                                </BoxButtonsData>
                            </>
                            :
                            <>
                                <Titulos tipo="h2" titulo="Informações Pessoais" />
                                <br />
                                <BoxTitle>Olá {nameCompletes}</BoxTitle>
                                <BoxData>
                                    <AiOutlineMail color="black" size={20} />
                                    <Datas>{emails}</Datas>
                                </BoxData>
                                <BoxData>
                                    <BsFillPersonFill color="black" size={20} />
                                    <Datas>{nameCompletes}</Datas>
                                </BoxData>
                                <BoxData>
                                    <BsTelephoneFill color="black" size={20} />
                                    <Datas>{phones}</Datas>
                                </BoxData>
                                <BoxData>
                                    <FaIdCard color="black" size={20} />
                                    <Datas>{cpfCnpj}</Datas>
                                </BoxData>

                                {cnpjs ?
                                    <>
                                        <BoxData>
                                            <AiOutlinePaperClip color="black" size={20} />
                                            <Datas>{stateRegistration}</Datas>
                                        </BoxData>
                                    </>
                                    :
                                    null
                                }

                                {cpfs ?
                                    <>
                                        <BoxData>
                                            <BsGenderTrans color="black" size={20} />
                                            <Datas>{generos}</Datas>
                                        </BoxData>
                                        <BoxData>
                                            <AiOutlinePaperClip color="black" size={20} />
                                            <Datas>{dataNascimentos}</Datas>
                                        </BoxData>
                                    </>
                                    :
                                    null
                                }

                                <BoxButtonsData>
                                    <ButtonsData
                                        onClick={handleEditCustomer}
                                    >
                                        Editar dados
                                    </ButtonsData>
                                    <ButtonsData
                                        onClick={newCustomer}
                                    >
                                        Cadastrar novo ou trocar usuario
                                    </ButtonsData>
                                </BoxButtonsData>
                            </>
                        }

                    </BoxPayment>

                    <BoxPayment>
                        <Titulos tipo="h2" titulo="Endereço de Entrega" />
                        <br />
                        {newDelivery ?
                            <BoxDelivery>
                                <BackButton
                                    onClick={closenewDelivery}
                                >
                                    <BsFillArrowLeftSquareFill color="red" size={25} />
                                    Voltar
                                </BackButton>

                                <Titulos
                                    tipo="h4"
                                    titulo="Insira um CEP abaixo para buscar o novo endereço"
                                />
                                <br />
                                <Input
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="00000-000"
                                    type="text"
                                    placeholder="CEP"
                                    onChange={(e) => setCepBusca(e.target.value)}
                                />

                                <ButtonDelivery
                                    style={{ width: '100%' }}
                                    onClick={loadCep}
                                >
                                    Buscar
                                </ButtonDelivery>

                                {cepLoad ?
                                    <>
                                        <br />
                                        <InputDelivery
                                            value={addresseeSelected}
                                            onChange={(e) => setAddresseeSelected(e.target.value)}
                                        />
                                        <br />
                                        <BoxInputs>
                                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {searchAddress?.logradouro}</TextCurrentInput>
                                            <InputDelivery
                                                value={numeroSelected}
                                                onChange={(e) => setNumeroSelected(e.target.value)}
                                            />
                                        </BoxInputs>

                                        <BoxInputs>
                                            <TextCurrentBold>Complemento: </TextCurrentBold>
                                            <InputDelivery
                                                value={complementSelected}
                                                onChange={(e) => setComplementSelected(e.target.value)}
                                            />
                                        </BoxInputs>

                                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</TextCurrent>

                                        <BoxInputs>
                                            <TextCurrentBold>Referencia: </TextCurrentBold>
                                            <InputDelivery
                                                value={referenceSelected}
                                                onChange={(e) => setReferenceSelected(e.target.value)}
                                            />
                                        </BoxInputs>

                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddress?.localidade} - {searchAddress?.uf}</TextCurrent>

                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddress?.cep}</TextCurrent>

                                        <BoxButtonsFunctions>
                                            <ButtonDelivery
                                                style={{ backgroundColor: 'green', color: 'white' }}
                                                onClick={handleNewDeliveryCustomer}
                                            >
                                                Cadastrar endereço
                                            </ButtonDelivery>

                                            <ButtonDelivery
                                                style={{ backgroundColor: 'red', color: 'white' }}
                                                onClick={closenewDelivery}
                                            >
                                                Cancelar
                                            </ButtonDelivery>
                                        </BoxButtonsFunctions>
                                    </>
                                    :
                                    null
                                }
                            </BoxDelivery>
                            :
                            <>
                                {allDeliverys ?
                                    <>
                                        <BackButton
                                            onClick={handleAllDeliverys}
                                        >
                                            <BsFillArrowLeftSquareFill color="red" size={25} />
                                            Voltar
                                        </BackButton>

                                        {deliverysCustomer.map((item, index) => {
                                            return (
                                                <>
                                                    <BoxDeliverySelected key={index}>
                                                        <DestinyName>{item?.addressee}</DestinyName>
                                                        <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {item?.address} - {item?.number}</TextCurrentInput>
                                                        <TextCurrent><TextCurrentBold>Complemento: </TextCurrentBold>{item?.complement}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>Referencia: </TextCurrentBold>{item?.reference}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{item?.neighborhood}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{item?.city} - {estadosSelected}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{item?.cep}</TextCurrent>

                                                        <BoxButtons>
                                                            <EditDelivery
                                                                onClick={() => handleOpenModal(item.id)}
                                                            >
                                                                <AiFillEdit
                                                                    color="orange"
                                                                    size={18}
                                                                />
                                                                EDITAR
                                                            </EditDelivery>

                                                            {item?.deliverySelected === "Nao" ? (
                                                                <BiCircle
                                                                    color="red"
                                                                    size={23}
                                                                    cursor="pointer"
                                                                    onClick={() => updateCurrentDelivery(item?.customer_id, item?.id, item?.cep)}
                                                                />
                                                            ) :
                                                                <BsFillCheckCircleFill
                                                                    color="green"
                                                                    size={20}
                                                                    cursor="pointer"
                                                                />
                                                            }
                                                        </BoxButtons>
                                                    </BoxDeliverySelected>
                                                </>
                                            )
                                        })}
                                    </>
                                    :
                                    <BoxDelivery>
                                        {deliveryEdits ?
                                            <>
                                                <Titulos
                                                    tipo="h4"
                                                    titulo="Insira um novo CEP, ou o mesmo CEP se deseja mudar o endereço atual"
                                                />
                                                <br />
                                                <Input
                                                    style={{ backgroundColor: 'white', color: 'black' }}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00000-000"
                                                    type="text"
                                                    placeholder="CEP"
                                                    onChange={(e) => setCepBusca(e.target.value)}
                                                />
                                                <ButtonDelivery
                                                    style={{ width: '100%' }}
                                                    onClick={loadCepEdit}
                                                >
                                                    Buscar
                                                </ButtonDelivery>

                                                {cepLoadEdit ?
                                                    <>
                                                        <br />
                                                        <TextCurrent>{addresseeSelected}</TextCurrent>
                                                        <BoxInputs>
                                                            <AiOutlineCompass color="black" size={20} />
                                                            <InputUpdate
                                                                dado={searchAddressEdit?.logradouro ? searchAddressEdit?.logradouro : addressSelected}
                                                                type="text"
                                                                placeholder={searchAddressEdit?.logradouro ? searchAddressEdit?.logradouro : addressSelected}
                                                                value={searchAddressEdit?.logradouro ? searchAddressEdit?.logradouro : addressSelected}
                                                                onChange={(e) => setAddressSelected(e.target.value)}
                                                                handleSubmit={updateAddressSelectedDelivery}
                                                            />

                                                            <InputUpdate
                                                                dado={numeroSelected}
                                                                type="text"
                                                                placeholder={numeroSelected}
                                                                value={numeroSelected}
                                                                onChange={(e) => setNumeroSelected(e.target.value)}
                                                                handleSubmit={updateNumberSelectedDelivery}
                                                            />
                                                        </BoxInputs>
                                                        <BoxInputs>
                                                            <TextCurrentBold>Complemento: </TextCurrentBold>
                                                            <TextCurrent>{complementSelected}</TextCurrent>
                                                        </BoxInputs>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Bairro: </TextCurrentBold>
                                                            <InputUpdate
                                                                dado={searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected}
                                                                type="text"
                                                                placeholder={searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected}
                                                                value={searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected}
                                                                onChange={(e) => setBairroSelected(e.target.value)}
                                                                handleSubmit={updateBairroSelectedDelivery}
                                                            />
                                                        </BoxInputs>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Referencia: </TextCurrentBold>
                                                            <TextCurrent>{referenceSelected}</TextCurrent>
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddressEdit?.localidade} - {searchAddressEdit?.uf}</TextCurrent>

                                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddressEdit?.cep}</TextCurrent>
                                                    </>
                                                    :
                                                    <>
                                                        <br />
                                                        <InputUpdate
                                                            dado={addresseeSelected}
                                                            type="text"
                                                            placeholder={addresseeSelected}
                                                            value={addresseeSelected}
                                                            onChange={(e) => setAddresseeSelected(e.target.value)}
                                                            handleSubmit={updateDestinySelectedDelivery}
                                                        />
                                                        <br />
                                                        <BoxInputs>
                                                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {addressSelected} - </TextCurrentInput>

                                                            <InputUpdate
                                                                dado={numeroSelected}
                                                                type="text"
                                                                placeholder={numeroSelected}
                                                                value={numeroSelected}
                                                                onChange={(e) => setNumeroSelected(e.target.value)}
                                                                handleSubmit={updateNumberSelectedDelivery}
                                                            />
                                                        </BoxInputs>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Complemento: </TextCurrentBold>
                                                            <InputUpdate
                                                                dado={complementSelected}
                                                                type="text"
                                                                placeholder={complementSelected}
                                                                value={complementSelected}
                                                                onChange={(e) => setComplementSelected(e.target.value)}
                                                                handleSubmit={updateComplementSelectedDelivery}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{bairroSelected}</TextCurrent>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Referencia: </TextCurrentBold>
                                                            <InputUpdate
                                                                dado={referenceSelected}
                                                                type="text"
                                                                placeholder={referenceSelected}
                                                                value={referenceSelected}
                                                                onChange={(e) => setReferenceSelected(e.target.value)}
                                                                handleSubmit={updateReferenceSelectedDelivery}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{citySelected} - {estadosSelected}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{cepSelected}</TextCurrent>
                                                    </>
                                                }
                                                <BoxButtonsFunctions>
                                                    {searchAddressEdit?.cep ?
                                                        <ButtonDelivery
                                                            style={{ backgroundColor: 'green', color: 'white' }}
                                                            onClick={updateSelectedDelivery}
                                                        >
                                                            Salvar novo CEP<br />e valor de frete
                                                        </ButtonDelivery>
                                                        :
                                                        null
                                                    }

                                                    <ButtonDelivery
                                                        style={{ backgroundColor: 'red', color: 'white' }}
                                                        onClick={handleDelivery}
                                                    >
                                                        Cancelar edição
                                                    </ButtonDelivery>
                                                </BoxButtonsFunctions>
                                            </>
                                            :
                                            <>
                                                <BoxButtons>
                                                    <DestinyName>{addresseeSelected}</DestinyName>
                                                    <FiEdit
                                                        size={20}
                                                        color="black"
                                                        cursor="pointer"
                                                        onClick={handleDelivery}
                                                    />
                                                </BoxButtons>

                                                <AddressTextIcon><AiOutlineCompass color="black" size={20} />{addressSelected} - {numeroSelected}</AddressTextIcon>
                                                <TextCurrent><TextCurrentBold>Complemento: </TextCurrentBold>{complementSelected}</TextCurrent>
                                                <TextCurrent><TextCurrentBold>Referencia: </TextCurrentBold>{referenceSelected}</TextCurrent>
                                                <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{bairroSelected}</TextCurrent>
                                                <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{citySelected} - {estadosSelected}</TextCurrent>
                                                <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{cepSelected}</TextCurrent>

                                                <BoxButtonsFunctions>
                                                    <ButtonDelivery
                                                        onClick={handleAllDeliverys}
                                                    >
                                                        Selecionar outro endereço
                                                    </ButtonDelivery>

                                                    <ButtonDelivery
                                                        onClick={handleNewDelivery}
                                                    >
                                                        Adicionar novo endereço
                                                    </ButtonDelivery>
                                                </BoxButtonsFunctions>
                                            </>
                                        }
                                    </BoxDelivery>
                                }
                            </>
                        }
                    </BoxPayment>

                    <BoxPayment>
                        <Titulos tipo="h2" titulo="Cupom" />
                        <br />
                        {cupomPayment ?
                            <BoxCupomPayment>
                                <h5>VOCÊ APLICOU UM CUPOM DE DESCONTO!!!</h5>
                                <br />
                                <TextCupom><TextCupomStrong>Código = </TextCupomStrong>{cupomCustomer?.code}</TextCupom>
                                <TextCupom><TextCupomStrong>Descrição = </TextCupomStrong>{cupomCustomer?.name}</TextCupom>
                                <br />
                                <ButtonRemove
                                    onClick={removeCupomPayment}
                                >
                                    Retirar o cupom
                                </ButtonRemove>
                            </BoxCupomPayment>
                            :
                            <>
                                <Titulos
                                    tipo="h4"
                                    titulo="Tem cupom de desconto? Aplique o código abaixo e aproveite!!!"
                                />
                                <br />
                                <BoxCupom>
                                    <Input
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        placeholder="CÓDIGO"
                                        onChange={(e) => setCodePromotion(e.target.value)}
                                    />
                                    <Button
                                        onClick={loadCupomCode}
                                    >
                                        Aplicar cupom
                                    </Button>
                                </BoxCupom>
                            </>
                        }
                    </BoxPayment>
                </ContainerFechamento>

                <ContainerFechamento>
                    <BoxPayment>
                        <Titulos tipo="h2" titulo="Envio" />
                        <br />
                        <br />
                        <Image src={logoCorreios} height={80} width={300} alt="envio-correios" />
                        <br />
                        <br />
                        <br />
                        <BoxPricesFinal>
                            <Total
                                style={{ fontSize: '22px' }}
                            >
                                ENTREGA EM:
                            </Total>
                            <Total
                                style={{ fontSize: '20px' }}
                            >
                                {daysDelivery === "0" ?
                                    <DeliverySpan>Estimativa de <Days>10</Days> dia(s) úteis</DeliverySpan>
                                    :
                                    <DeliverySpan><Days>{daysDelivery}</Days> Dia(s) úteis</DeliverySpan>
                                }
                            </Total>
                        </BoxPricesFinal>
                    </BoxPayment>
                    <BoxPayment>
                        <Titulos tipo="h2" titulo="Formas de Pagamento" />
                        <br />
                        <br />
                        <BoxIconsPayment>
                            {typesPayment.map((item, index) => {
                                return (
                                    <>
                                        <PayIcon
                                            key={index}
                                            style={{
                                                backgroundColor: colorPay === item.id ? "orange" : "white"
                                            }}
                                            onClick={() => handleChosePayment(item.id)}
                                        >
                                            <br />
                                            {item.pay_name}
                                            <Image src={item.icon_pay} height={70} width={85} alt="pagar" />
                                        </PayIcon>
                                    </>
                                )
                            })}
                        </BoxIconsPayment>
                        <br />
                        <br />
                        {activePayment === "boleto" ?
                            <FormPayBoletPix id="form-checkoutBoleto" onSubmit={handleRegisterBoleto}>
                                <BoxFinalCart>
                                    <TextCurrentBold style={{ fontSize: '19px', marginBottom: '10px' }}>Total a pagar: </TextCurrentBold>
                                    <TextCurrent style={{ color: 'red', fontSize: '19px' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}</TextCurrent>
                                    <Button
                                        style={{ margin: '30px', width: '80%' }}
                                        id="form-checkoutBoleto"
                                        type="submit"
                                    >
                                        FINALIZAR COMPRA<br />E GERAR BOLETO
                                    </Button>
                                </BoxFinalCart>
                            </FormPayBoletPix>
                            :
                            null
                        }

                        {/* {activePayment === "cartao_de_credito" ?
                            
                            :
                            null
                        } */}

                            <div>
                                <form id="form-checkout">

                                    <div
                                        id="form-checkout__cardNumber"
                                        className="container mpFormInput"
                                    ></div>

                                    <div
                                        id="form-checkout__expirationDate"
                                        className="container mpFormInput"
                                    ></div>

                                    <div
                                        id="form-checkout__securityCode"
                                        className="container mpFormInput"
                                    ></div>

                                    <input
                                        type="text"
                                        id="form-checkout__cardholderName"
                                        className="cardHolderName mpFormInput"
                                    />

                                    <select
                                        id="form-checkout__issuer"
                                        className="container mpFormInput"
                                    ></select>

                                    <select
                                        id="form-checkout__installments"
                                        className="container mpFormInput"
                                    ></select>

                                    <select
                                        id="form-checkout__identificationType"
                                        className="container mpFormInput"
                                    ></select>

                                    <input
                                        type="text"
                                        id="form-checkout__identificationNumber"
                                        className="container mpFormInput"
                                    />

                                    <input
                                        type="email"
                                        id="form-checkout__cardholderEmail"
                                        className="container mpFormInput"
                                    />

                                    <BoxFinalCart>
                                        <Button
                                            style={{ margin: '30px', width: '80%' }}
                                            type="submit"
                                            id="form-checkout__submit"
                                            className="container"
                                        >
                                            FINALIZAR COMPRA
                                        </Button>
                                    </BoxFinalCart>
                                    <progress value="0" className="progress-bar">
                                        Carregando...
                                    </progress>
                                </form>
                            </div>

                        {activePayment === "pix" ?
                            <FormPayBoletPix id="form-checkoutPix" onSubmit={handleRegisterPix}>
                                <BoxFinalCart>
                                    <TextCurrentBold style={{ fontSize: '19px', marginBottom: '10px' }}>Total a pagar: </TextCurrentBold>
                                    <TextCurrent style={{ color: 'red', fontSize: '19px' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}</TextCurrent>
                                    <Button
                                        style={{ margin: '30px', width: '80%' }}
                                        id="form-checkoutPix" type="submit"
                                    >
                                        FINALIZAR COMPRA<br />E GERAR CHAVE PIX
                                    </Button>
                                </BoxFinalCart>
                            </FormPayBoletPix>
                            :
                            null
                        }
                    </BoxPayment>
                    <BoxPayment>
                        <Titulos tipo="h2" titulo="Resumo do Pedido" />
                        <br />
                        {newDataProducts?.length >= 1 ? (
                            <>
                                {newDataProducts.map((item: any, index: any) => {
                                    return (
                                        <BoxProductPayment key={index}>
                                            <ImageProductPayment>
                                                <Image src={'http://localhost:3333/files/' + item?.product?.photoproducts[0]?.image} width={80} height={80} alt={item?.product?.name} />
                                            </ImageProductPayment>

                                            <BoxDataProductPayment>
                                                <NameProduct>{item?.product?.name}</NameProduct>
                                                {item?.product?.relationattributeproducts.map((atr: any, index) => {
                                                    return (
                                                        <AtributeProduct key={index}>{atr?.valueAttribute?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                                    )
                                                })}
                                            </BoxDataProductPayment>

                                            <BoxPricesTotalProduct>
                                                <BoxPricesPayment>
                                                    <AmountProduct>Qtd: {item?.amount}</AmountProduct>
                                                    <PriceProduct style={{ color: 'red' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price ? item?.price : item?.product?.promotion)}</PriceProduct>
                                                    <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount)}</PriceProductData>
                                                </BoxPricesPayment>
                                            </BoxPricesTotalProduct>
                                        </BoxProductPayment>
                                    )
                                })}
                            </>
                        ) :
                            <>
                                {productsCart.map((item, index) => {
                                    return (
                                        <BoxProductPayment key={index}>
                                            <ImageProductPayment>
                                                <Image src={'http://localhost:3333/files/' + item?.product?.photoproducts[0]?.image} width={80} height={80} alt={item?.product?.name} />
                                            </ImageProductPayment>

                                            <BoxDataProductPayment>
                                                <NameProduct>{item?.product?.name}</NameProduct>
                                                {item?.product?.relationattributeproducts.map((atr: any, index) => {
                                                    return (
                                                        <AtributeProduct key={index}>{atr?.valueAttribute?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                                    )
                                                })}
                                            </BoxDataProductPayment>

                                            <BoxPricesTotalProduct>
                                                <BoxPricesPayment>
                                                    <AmountProduct>Qtd: {item?.amount}</AmountProduct>
                                                    <PriceProduct>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.product?.promotion)}</PriceProduct>
                                                    <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.product?.promotion * item?.amount)}</PriceProductData>
                                                </BoxPricesPayment>
                                            </BoxPricesTotalProduct>
                                        </BoxProductPayment>
                                    )
                                })}
                            </>
                        }

                        {cupomPayment ?
                            <>
                                <BoxPricesFinal>
                                    <Total
                                        style={{ fontSize: '19px' }}
                                    >
                                        SUBTOTAL
                                    </Total>
                                    <Total
                                        style={{ fontSize: '19px' }}
                                    >
                                        {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(newSubTotalCart === 0 ? totalCart : newSubTotalCart)}
                                    </Total>
                                </BoxPricesFinal>
                                <BoxPricesFinal>
                                    <SubTotal></SubTotal>
                                    <More>+</More>
                                </BoxPricesFinal>
                                <BoxPricesFinal>
                                    <SubTotal>FRETE</SubTotal>
                                    <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(fretePaymentCoupon === fretePayment ? fretePayment : fretePaymentCoupon)}</ValuesMore>
                                </BoxPricesFinal>
                                <BoxPricesFinal>
                                    <SubTotal></SubTotal>
                                    <More>=</More>
                                </BoxPricesFinal>
                                <hr />
                                <BoxPricesFinal>
                                    <Total
                                        style={{ fontSize: '22px' }}
                                    >
                                        TOTAL
                                    </Total>
                                    <Total
                                        style={{ fontSize: '22px', color: 'red' }}
                                    >
                                        {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}
                                    </Total>
                                </BoxPricesFinal>
                            </>
                            :
                            <>
                                {formatedCupom ?
                                    <>
                                        <BoxPricesFinal>
                                            <Total
                                                style={{ fontSize: '19px' }}
                                            >
                                                SUBTOTAL
                                            </Total>
                                            <Total
                                                style={{ fontSize: '19px' }}
                                            >
                                                {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(newSubTotalPrice === 0 ? totalCart : newSubTotalPrice)}
                                            </Total>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>+</More>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal>FRETE</SubTotal>
                                            <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(fretePayment)}</ValuesMore>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>=</More>
                                        </BoxPricesFinal>
                                        <hr />
                                        <BoxPricesFinal>
                                            <Total style={{ fontSize: '22px' }}>
                                                TOTAL
                                            </Total>
                                            <Total style={{ fontSize: '22px', color: 'red' }}>
                                                {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedCupom)}
                                            </Total>
                                        </BoxPricesFinal>
                                    </>
                                    :
                                    <>
                                        <BoxPricesFinal>
                                            <Total style={{ fontSize: '19px' }}>
                                                SUBTOTAL
                                            </Total>
                                            <Total style={{ fontSize: '19px' }}>
                                                {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}
                                            </Total>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>+</More>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal>FRETE</SubTotal>
                                            {freteCupom === 0 ? (
                                                <>
                                                    {zero === 0 ? (
                                                        <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(fretePaymentCoupon)}</ValuesMore>
                                                    ) :
                                                        <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedFrete === 0 ? fretePayment : formatedFrete)}</ValuesMore>
                                                    }
                                                </>
                                            ) :
                                                <>
                                                    <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(freteCupom)}</ValuesMore>
                                                </>
                                            }
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>=</More>
                                        </BoxPricesFinal>
                                        <hr />
                                        <BoxPricesFinal>
                                            <Total style={{ fontSize: '22px' }}>TOTAL</Total>
                                            {freteCupom === 0 ? (
                                                <Total style={{ fontSize: '22px', color: 'red' }}>
                                                    {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}
                                                </Total>
                                            ) :
                                                <Total style={{ fontSize: '22px', color: 'red' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + freteCupom)}</Total>
                                            }
                                        </BoxPricesFinal>
                                    </>
                                }
                            </>
                        }
                    </BoxPayment>
                </ContainerFechamento>
            </SectionPayment>

            <FooterAccount />

            {modalVisible && (
                <ModalDeliveryEdit
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    /* @ts-ignore */
                    deliverys={modalItem}
                />
            )}
        </>
    )
}

export const getServerSideProps = canSSRAuthPayment(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});