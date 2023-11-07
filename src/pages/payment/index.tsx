import { useContext, useEffect, useState } from "react";
import { canSSRAuthPayment } from "../../utils/canSSRAuthPayment";
import { setupAPIClient } from "../../services/api";
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
    BoxCard,
    BoxCardCustomer,
    BoxCupom,
    BoxCupomPayment,
    BoxData,
    BoxDataCard,
    BoxDataCardCode,
    BoxDataProductPayment,
    BoxDelivery,
    BoxDeliverySelected,
    BoxIconsPayment,
    BoxInputs,
    BoxPayment,
    BoxPaymentEnvio,
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
    ErrorCard,
    ImageProductPayment,
    InputDelivery,
    InputPropetyNameCard,
    LabelForm,
    PayIcon,
    SectionPayment,
    SelectCardData,
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
import Image from "next/image";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import SelectUpdate from "../../components/ui/SelectUpdate";
import {
    AtributeProduct,
    BoxFinalCart,
    BoxPricesFinal,
    BoxPricesTotalProduct,
    ErrorText,
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
import { Loading } from "../../components/Loading";
import CreditCardInput from 'react-credit-card-input';
import SelectParcelasCardPay from "../../components/ui/SelectParcelasCardPay";
import { ModalErrorPayment } from "../../components/popups/ModalErrorPayment";


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

    const {
        updateCartAbandoned,
        refresh,
        clearAllCart,
        prazoEntrega,
        newSubTotalCart,
        newDataProducts,
        cartProducts,
        productsCart,
        totalCart,
        totalFinishCart,
        dataTotalCart,
        nameCupomPayment,
        cupomPayment,
        fretePayment,
        fretePaymentCoupon
    } = useContext(CartContext);

    const { customer, signOutPayment } = useContext(AuthContext);
    let customer_id = customer?.id;

    let apiClient = setupAPIClient();
    let storageId = String(cartProducts[0]?.store_cart_id);

    const [paymentCupom, setPaymentCupom] = useState(cupomPayment);
    const [searchAddress, setSearchAddress] = useState<CepProps>();
    const [searchAddressEdit, setSearchAddressEdit] = useState<CepProps>();
    const [daysDelivery, setDaysDelivery] = useState('');

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [phones, setPhones] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
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
    const [modalVisibleErrorPayment, setModalVisibleErrorPayment] = useState(false);
    const [menssageErrorPayment, setMenssageErrorPayment] = useState("");

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

    const [dataFrete] = useState<any[]>([]);

    const [cupomCustomer, setCupomCustomer] = useState<CuoponProps>();

    const [totalDesconto, setTotalDesconto] = useState("");
    const [newPriceArray, setNewPriceArray] = useState<any[]>([]);
    const [zero, setZero] = useState(100);
    const [freteCupom, setFreteCupom] = useState(Number);
    const [newSubTotalPrice, setNewSubTotalPrice] = useState(Number);
    const [codePromotion, setCodePromotion] = useState("");

    const [activePayment, setActivePayment] = useState("");
    const [colorPay, setColorPay] = useState("");

    const [cardBrand, setCardBrand] = useState<any>({});
    const [loadingCupom, setLoadingCupom] = useState(false);
    const [loadingFrete, setLoadingFrete] = useState(false);
    const [loadingNewFrete, setLoadingNewFrete] = useState(false);
    const [loadingFreteEdit, setLoadingFreteEdit] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    const handleDateChange = (e: { target: { value: any; }; }) => {
        const inputDate = e.target.value;
        const numericDate = inputDate.replace(/\D/g, '');

        if (numericDate.length <= 2) {
            setDateOfBirth(numericDate);
        } else if (numericDate.length <= 4) {
            setDateOfBirth(`${numericDate.slice(0, 2)}/${numericDate.slice(2)}`);
        } else {
            setDateOfBirth(`${numericDate.slice(0, 2)}/${numericDate.slice(2, 4)}/${numericDate.slice(4, 8)}`);
        }
    };

    const formatCnpj = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const formattedCnpj = numericValue.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        );
        setCnpj(formattedCnpj);
    };

    const handleCnpjChange = (e: { target: { value: string; }; }) => {
        formatCnpj(e.target.value);
    };

    const formatCPF = (value: string) => {
        const numericValue = value.replace(/\D/g, '');

        let formattedValue = '';
        for (let i = 0; i < numericValue.length; i++) {
            if (i === 3 || i === 6) {
                formattedValue += '.';
            } else if (i === 9) {
                formattedValue += '-';
            }
            formattedValue += numericValue[i];
        }

        return formattedValue;
    };

    const handleCPFChange = (event: { target: { value: any; }; }) => {
        const inputValue = event.target.value;
        const formattedCPF = formatCPF(inputValue);

        setCpf(formattedCPF);
    };

    const formatPhoneNumber = (input: string) => {
        const cleanedInput = input.replace(/\D/g, '');
        if (cleanedInput.length <= 2) {
            return `(${cleanedInput}`;
        } else if (cleanedInput.length <= 6) {
            return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(2)}`;
        } else {
            return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(2, 6)}-${cleanedInput.slice(6, 10)}`;
        }
    };

    const handlePhoneNumberChange = (e: { target: { value: any; }; }) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setPhoneNumber(formattedValue);
    };

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display1 = datasConfigs[0]?.cupom_in_payment === "Disponivel" ? "block" : "none";
    const display2 = datasConfigs[0]?.payment_pix === "Disponivel" ? "block" : "none";
    const display3 = datasConfigs[0]?.payment_boleto === "Disponivel" ? "block" : "none";
    const display4 = datasConfigs[0]?.payment_cartao === "Disponivel" ? "block" : "none";


    let typesPayment = [
        {
            id: "boleto",
            icon_pay: boleto,
            pay_name: "Boleto",
            view: display3
        },
        {
            id: "cartao_de_credito",
            icon_pay: cartao,
            pay_name: "Cartão de Crédito",
            view: display4
        },
        {
            id: "pix",
            icon_pay: pix,
            pay_name: "PIX",
            view: display2
        }
    ];

    const handleChosePayment = (id: string) => {
        setActivePayment(id);
        setColorPay(id);
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
        try {
            setLoadingFreteEdit(true);
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setLoadingFreteEdit(false);
            setSearchAddress(response?.data);
            handleCep();
        } catch (error) {
            console.log(error)
        }
    }

    async function loadCepEdit() {
        try {
            setLoadingFreteEdit(true);
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setLoadingFreteEdit(false);
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

    async function loadDataCustomer() {
        try {
            const { data } = await apiClient.get(`/customer/listExactCustomerIDstore?customer_id=${customer_id}`);

            setNameCompletes(data?.name || "");
            setCnpjs(data?.cnpj || "");
            setCnpj(data?.cnpj || "");
            setCpfs(data?.cpf || "");
            setCpf(data?.cpf || "");
            setStateRegistration(data?.stateRegistration || "");
            setPhones(data?.phone || "");
            setPhoneNumber(data?.phone || "");
            setEmails(data?.email || "");
            setDataNascimentos(data?.dateOfBirth || "");
            setDateOfBirth(data?.dateOfBirth || "");
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

    useEffect(() => {
        async function loadCustomerData() {
            try {
                const { data } = await apiClient.get(`/customer/listExactCustomerIDstore?customer_id=${customer_id}`);

                setNameCompletes(data?.name || "");
                setCnpjs(data?.cnpj || "");
                setCnpj(data?.cnpj || "");
                setCpfs(data?.cpf || "");
                setCpf(data?.cpf || "");
                setStateRegistration(data?.stateRegistration || "");
                setPhones(data?.phone || "");
                setPhoneNumber(data?.phone || "");
                setEmails(data?.email || "");
                setDataNascimentos(data?.dateOfBirth || "");
                setDateOfBirth(data?.dateOfBirth || "");
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

    async function lastCustomerDelivery() {
        try {
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

    useEffect(() => {
        async function deliverys() {
            try {
                const { data } = await apiClient.get(`/customer/findAlldeliveryCustomer?customer_id=${customer_id}`);
                setDeliverysCustomer(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        deliverys();
    }, [customer_id]);

    async function deliverys() {
        try {
            const { data } = await apiClient.get(`/customer/findAlldeliveryCustomer?customer_id=${customer_id}`);
            setDeliverysCustomer(data || []);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateName() {
        try {
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateNameCustomer?customer_id=${customer_id}`, { name: nameCompletes });

                toast.success('Nome atualizado com sucesso.');

                loadDataCustomer();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateDataCustomer() {
        try {
            await apiClient.put(`/customer/updateDateCustomerStore?customer_id=${customer_id}`, {
                cpf: cpf,
                cnpj: cnpj,
                stateRegistration: stateRegistration,
                phone: phoneNumber,
                dateOfBirth: dateOfBirth,
                gender: generoSelected,
            });

            toast.success('Dado atualizado com sucesso.');

            loadDataCustomer();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado.');
        }
    }

    async function updateEmail() {
        try {
            if (!isEmail(emails)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            if (emails === '') {
                toast.error('Não deixe o email em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateDateCustomerStore?customer_id=${customer_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                loadDataCustomer();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    useEffect(() => {
        async function loadCupom() {
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
            setLoadingCupom(false);
            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + fretePayment
            });

            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                frete_coupon: 0,
                name_cupom: null,
                coupon: null,
                new_subTotal: 0,
                new_value_products: [],
            });

            setLoadingCupom(true);

            setTimeout(() => {
                Router.reload();
            }, 3000);

            updateCartAbandoned();

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

    const peso = Math.round(totalPeso > 30 ? 28 : totalPeso);
    const comprimento = Math.round(totalComprimento > 82 ? 81 : totalComprimento);
    const altura = Math.round(totalAltura > 37 ? 36 : totalAltura);
    const largura = Math.round(totalLargura > 82 ? 81 : totalLargura);

    useEffect(() => {
        async function deliveryDays() {
            try {
                setLoadingFrete(true);
                const { data } = await apiClient.post('/freteCalculo', {
                    /* nCdServico: "04162", */
                    sCepDestino: String(cepSelected),
                    nVlPeso: String(peso),
                    /* nCdFormato: 1, */
                    nVlComprimento: String(comprimento),
                    nVlAltura: String(altura),
                    nVlLargura: String(largura)
                });

                setLoadingFrete(false);

                setDaysDelivery(data[0].PrazoEntrega);

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

        try {

            setLoadingFreteEdit(true);

            await apiClient.put(`/customer/delivery/updateCurrentDelivery?customer_id=${customer_id}&deliveryAddressCustomer_id=${id}`);

            const cepfrete = cep;
            /* @ts-ignore */
            dataTotalCart(cepfrete);

            const { data } = await apiClient.post('/freteCalculo', {
                /* nCdServico: "04162", */
                sCepDestino: String(cepfrete),
                nVlPeso: String(peso),
                /* nCdFormato: 1, */
                nVlComprimento: String(comprimento),
                nVlAltura: String(altura),
                nVlLargura: String(largura)
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
            const daysDelivery = String(data[0]?.PrazoEntrega);

            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
                days_delivery: daysDelivery
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            setLoadingFreteEdit(false);

            lastCustomerDelivery();
            refresh();
            deliverys();

            toast.success('Endereço de entrega escolhido com sucesso')

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updateDestinySelectedDelivery() {
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

        const cep = searchAddressEdit?.cep;

        setLoadingFreteEdit(true);

        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                cep: searchAddressEdit?.cep,
                neighborhood: searchAddressEdit?.bairro ? searchAddressEdit?.bairro : bairroSelected,
                city: searchAddressEdit?.localidade,
                state: searchAddressEdit?.uf
            });

            const { data } = await apiClient.post('/freteCalculo', {
                /* nCdServico: "04162", */
                sCepDestino: cep,
                nVlPeso: String(peso),
                /* nCdFormato: 1, */
                nVlComprimento: String(comprimento),
                nVlAltura: String(altura),
                nVlLargura: String(largura)
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
            const daysDelivery = String(data[0]?.PrazoEntrega);

            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
                days_delivery: daysDelivery
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            lastCustomerDelivery();
            refresh();
            deliverys();

            setLoadingFreteEdit(false);

            toast.success("Endereço atual alterado com sucesso");

            handleDelivery();

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

        try {

            setLoadingNewFrete(true);

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
                /* nCdServico: "04162", */
                sCepDestino: cep,
                nVlPeso: String(peso),
                /* nCdFormato: 1, */
                nVlComprimento: String(comprimento),
                nVlAltura: String(altura),
                nVlLargura: String(largura)
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
            const daysDelivery = String(data[0]?.PrazoEntrega);

            await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
                cep: cepfrete,
                frete: frete,
                days_delivery: daysDelivery
            });

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + frete
            });

            lastCustomerDelivery();
            refresh();
            deliverys();

            setLoadingNewFrete(false);

            toast.success("Novo endereço cadastrado com sucesso");

            closenewDelivery();

        } catch (error) {
            console.log(error);
        }
    }

    async function loadCupomCode() {

        if (cupomPayment) {
            toast.error("Retire o cupom atual antes de aplicar um outro cupom");
            return;
        }

        try {
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);

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
                    const name_cupom = data?.name;
                    const code = codePromotion;
                    const subTot = totalPriceDesconto;
                    const newvalue = newCartValue;
                    /* @ts-ignore */
                    dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
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

                    refresh();
                    updateCartAbandoned();

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
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = descontoPriceTotal;
                const newvalue = newCartValue;
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
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

                refresh();
                updateCartAbandoned();

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
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
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

                refresh();
                updateCartAbandoned();

                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {

                const zeroFrete = fretePayment - (fretePayment * zero / 100);

                const frete = fretePayment;
                const frete_coupon = 0;
                const cepfrete = cepSelected;
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
                setZero(zeroFrete);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart
                });

                toast.success("Cupom aplicado com sucesso!");

                refresh();
                updateCartAbandoned();

                return;
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {

                const valueFrete = fretePayment - data?.coupomsconditionals[0]?.value;

                const frete = fretePayment;
                const frete_coupon = valueFrete;
                const cepfrete = cepSelected;
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
                setFreteCupom(valueFrete);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + frete_coupon
                });

                toast.success("Cupom aplicado com sucesso!");

                refresh();
                updateCartAbandoned();

                return;
            }

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {

                const percentShipping = fretePayment - (fretePayment * data?.coupomsconditionals[0]?.value / 100);

                const frete = fretePayment;
                const frete_coupon = percentShipping;
                const cepfrete = cepSelected;
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
                setFreteCupom(percentShipping);

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + frete_coupon
                });

                toast.success("Cupom aplicado com sucesso!");

                refresh();
                updateCartAbandoned();

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
                    const name_cupom = data?.name;
                    const code = codePromotion;
                    const subTot = totalPriceDesconto;
                    const newvalue = newCart;
                    /* @ts-ignore */
                    dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);

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

                    refresh();
                    updateCartAbandoned();

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
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = 0;
                const newvalue = [];
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);
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

                refresh();
                updateCartAbandoned();

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
                const name_cupom = data?.name;
                const code = codePromotion;
                const subTot = totalPriceDesconto;
                const newvalue = newCartValue;
                /* @ts-ignore */
                dataTotalCart(cepfrete, frete, name_cupom, code, frete_coupon, subTot, newvalue, prazoEntrega);

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

                refresh();
                updateCartAbandoned();

                return;
            }

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    function handleCloseModal() {
        setModalVisible(false);
        setModalVisibleErrorPayment(false);
    }

    async function handleOpenModal(id: string) {
        const { data } = await apiClient.get(`/customer/delivery/findUniqueDelivery?deliveryAddressCustomer_id=${id}`);
        setModalItem(data);
        setModalVisible(true);
    }

    async function handleOpenModalErrorPayment() {
        setModalVisibleErrorPayment(true);
    }

    Modal.setAppElement('#__next');

    const WEB_URL = 'http://localhost:3001';
    let param = '';
    productsCart && productsCart.map((ele) => {
        param = param + 'product_id=' + ele.product_id + '&'
    });
    const NEW_URL = WEB_URL + '?' + param;
    let url = new URL(NEW_URL);

    let productsId: string = url?.search;




    /* CARTÃO DE CRÉDITO */



    const [nomeTitular, setNomeTitular] = useState('');
    const [errorNameHolderCard, setErrorNameHolderCard] = useState("");
    const [numeroCartao, setNumeroCartao] = useState('');
    const [errorNumberCardHolderCard, setErrorNumberCardHolderCard] = useState("");
    const [dataExpiracao, setDataExpiracao] = useState('');
    const [errorDataCardHolderCard, setErrorDataCardHolderCard] = useState("");
    const [numeroSeguranca, setNumeroSeguranca] = useState('');
    const [errorCVCCardHolderCard, setErrorCVCCardHolderCard] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState('CPF');
    const [cpfOrCnpjPay, setCpfOrCnpjPay] = useState('');
    const [errorDocumentHolderCard, setErrorDocumentHolderCard] = useState("");
    const [parcelaSelected, setParcelaSelected] = useState("");
    const [parcelas, setParcelas] = useState([]);
    const juros = 1.99;

    const numberCard = numeroCartao.replace(/\s+/g, '');
    const dataExpirationCard = dataExpiracao.replace(/\s+/g, '').split("/");
    const yaerExpirationCard = "20" + dataExpirationCard[1];

    function handleChangeParcela(e: any) {
        setParcelaSelected(e.target.value)
    }

    const valueArray = parcelaSelected.split(",");
    const numParcela = Number(valueArray[0]) === 0 || Number(valueArray[0]) === 1 ? null : Number(valueArray[0]);
    const valueParcela = isNaN(Number(valueArray[1])) || Number(valueArray[1]) >= totalFinishCart ? null : Number(valueArray[1]);

    useEffect(() => {
        const calcularParcelas = () => {
            const parcelasCalculadas = [];

            for (let i = 1; i <= 12; i++) {
                const valorComJuros = i > 8 ? totalFinishCart * (1 + juros / 100) : totalFinishCart;
                const valorParcela = valorComJuros / i;
                parcelasCalculadas.push({
                    numeroParcelas: i,
                    valor: valorParcela.toFixed(2),
                });
            }

            setParcelas(parcelasCalculadas);
        };

        calcularParcelas();

    }, [totalFinishCart]);

    const formatCnpjPay = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const formattedCnpj = numericValue.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        );
        setCpfOrCnpjPay(formattedCnpj);
    };

    const handleCnpjPayChange = (e: { target: { value: string; }; }) => {
        formatCnpjPay(e.target.value);
    };

    const formatCPFPay = (value: string) => {
        const numericValue = value.replace(/\D/g, '');

        let formattedValue = '';
        for (let i = 0; i < numericValue.length; i++) {
            if (i === 3 || i === 6) {
                formattedValue += '.';
            } else if (i === 9) {
                formattedValue += '-';
            }
            formattedValue += numericValue[i];
        }

        return formattedValue;
    };

    const handleCPFPayChange = (event: { target: { value: any; }; }) => {
        const inputValue = event.target.value;
        const formattedCPF = formatCPFPay(inputValue);

        setCpfOrCnpjPay(formattedCPF);
    };

    const formatCnpjOrCpf = cpfOrCnpjPay.replace(/[./-]/g, '');

    async function handleRegisterCardPay() {
        try {
            if (nomeTitular === "") {
                setErrorNameHolderCard("Preencha o nome do titular do cartão");
                return;
            }
            if (cpfOrCnpjPay === "") {
                setErrorDocumentHolderCard("Preencha o documento do titular do cartão");
                return;
            }
            if (numberCard === "") {
                setErrorNumberCardHolderCard("Preecha o número do cartão de crédito");
                return;
            }
            if (dataExpiracao === "") {
                setErrorDataCardHolderCard("Preencha a data de vencimento do cartão de crédito");
                return;
            }
            if (numeroSeguranca === "") {
                setErrorCVCCardHolderCard("Preencha o número de segurança do cartão de crédito");
                return;
            }
            await apiClient.post("/paymentCardResult", {
                holderName: nomeTitular,
                number_card: numberCard,
                expiryMonth: dataExpirationCard[0],
                expiryYear: yaerExpirationCard,
                ccv: numeroSeguranca,
                cardholder_identification_cpfCnpj: tipoDocumento,
                cpfCnpj: formatCnpjOrCpf,
                customer_id: customer_id,
                value_pay: Number(totalFinishCart.toFixed(2)),
                installmentCount: numParcela,
                installmentValue: valueParcela
            }).then(async (response) => {

                if (response.data.status === 400) {

                    setMenssageErrorPayment("OPS... Algo deu de errado com o seu pagamento, porfavor verifique os dados dos seu cartão de crédito.");
                    handleOpenModalErrorPayment();

                    return;

                } else {

                    try {
                        await apiClient.post("/createFinishPaymentCardOrder", {
                            store_cart_id: cartProducts[0]?.store_cart_id,
                            frete_cupom: fretePaymentCoupon,
                            frete: fretePayment,
                            delivery_id: idSelected,
                            order_data_delivery: prazoEntrega,
                            name_cupom: nameCupomPayment,
                            cupom: cupomPayment,
                            peso: peso,
                            number_card: numberCard,
                            value_pay: Number(totalFinishCart.toFixed(2)),
                            installmentCount: numParcela,
                            value_pay_finish: response.data.value,
                            customer_id: customer_id,
                            transaction_id: response.data.id,
                            last_number_credit_card: response.data.creditCard.creditCardNumber,
                            expiration_month: dataExpirationCard[0],
                            expiration_year: yaerExpirationCard,
                            date_created: response.data.dateCreated,
                            cardholder_name: nomeTitular,
                            cardholder_identification_cpfCnpj: tipoDocumento,
                            cardholder_cpfCnpj: formatCnpjOrCpf,
                            flag_credit_card: response.data.creditCard.creditCardBrand,
                            status_order: response.data.status
                        });

                        await apiClient.put(`/updateStockPayment${productsId}`);

                        setLoadingPayment(true);

                        setTimeout(() => {
                            clearAllCart();
                        }, 3000);

                        Router.push('/thanks');

                    } catch (error) {
                        setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
                        handleOpenModalErrorPayment();
                    }
                }

            })
                .catch((erro) => {
                    console.error(erro);
                    setMenssageErrorPayment("OPS... Algo deu de errado com o seu pagamento, porfavor verifique os dados dos seu cartão de crédito.");
                    handleOpenModalErrorPayment();
                });

        } catch (error) {
            console.log(error);
            setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
            handleOpenModalErrorPayment();
        }

    }



    /* BOLETO BANCÁRIO */



    async function handleRegisterBoleto() {
        try {
            await apiClient.post("/paymentBoletoResult", {
                customer_id: customer_id,
                value_pay: Number(totalFinishCart.toFixed(2))
            }).then(async (response) => {

                if (response.data.status === 400) {

                    setMenssageErrorPayment("OPS... Algo deu de errado ao gerar o seu boleto para pagar o pedido.");
                    handleOpenModalErrorPayment();

                    return;

                } else {

                    try {
                        await apiClient.post("/createFinishPaymentBoletoOrder", {
                            customer_id: customer_id,
                            transaction_id: response.data.id,
                            value_pay: Number(totalFinishCart.toFixed(2)),
                            expiration_boleto: response.data.dueDate,
                            store_cart_id: cartProducts[0]?.store_cart_id,
                            external_resource_url: response.data.bankSlipUrl,
                            status_order: response.data.status,
                            frete_cupom: fretePaymentCoupon,
                            frete: fretePayment,
                            delivery_id: idSelected,
                            order_data_delivery: prazoEntrega,
                            name_cupom: nameCupomPayment,
                            cupom: cupomPayment,
                            peso: peso
                        });

                        await apiClient.put(`/updateStockPayment${productsId}`);

                        setLoadingPayment(true);

                        setTimeout(() => {
                            clearAllCart();
                        }, 3000);

                        Router.push('/thanks');

                    } catch (error) {
                        console.log(error.response.data);
                        setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
                        handleOpenModalErrorPayment();
                    }
                }

            })
                .catch((error) => {
                    console.log(error.response.data);
                    setMenssageErrorPayment("OPS... Algo deu de errado ao gerar o seu boleto para pagar o pedido.");
                    handleOpenModalErrorPayment();
                });

        } catch (error) {
            console.log(error.response.data);
            setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
            handleOpenModalErrorPayment();
        }

    }



    /* PIX */

    

    async function handleRegisterPix() {
        try {
            await apiClient.post("/paymentPixResult", {
                customer_id: customer_id,
                value_pay: Number(totalFinishCart.toFixed(2))
            }).then(async (response) => {

                if (response.data.status === 400) {

                    setMenssageErrorPayment("OPS... Algo deu de errado ao gerar a chave PIX e o QR Code para o pagamento do seu pedido.");
                    handleOpenModalErrorPayment();

                    return;

                } else {

                    try {

                        const id_pay_pix = response.data.id;

                        await apiClient.get(`/findResultsPIXPayment?id_pay_pix=${id_pay_pix}`)
                            .then(async (res) => {

                                await apiClient.post("/createFinishPaymentPIXOrder", {
                                    customer_id: customer_id,
                                    transaction_id: response.data.id,
                                    key_payment_pix: res.data.payload,
                                    qr_code_pix: res.data.encodedImage,
                                    key_valid_pix: res.data.expirationDate,
                                    value_pay: Number(totalFinishCart.toFixed(2)),
                                    status_order: response.data.status,
                                    store_cart_id: cartProducts[0]?.store_cart_id,
                                    frete_cupom: fretePaymentCoupon,
                                    frete: fretePayment,
                                    delivery_id: idSelected,
                                    order_data_delivery: prazoEntrega,
                                    name_cupom: nameCupomPayment,
                                    cupom: cupomPayment,
                                    peso: peso
                                });

                                await apiClient.put(`/updateStockPayment${productsId}`);

                                setLoadingPayment(true);

                                setTimeout(() => {
                                    clearAllCart();
                                }, 3000);

                                Router.push('/thanks');

                            })
                            .catch((erro) => {
                                console.error(erro);
                                setMenssageErrorPayment("OPS... Algo deu de errado ao gerar a chave PIX e o QR Code para o pagamento do seu pedido.");
                                handleOpenModalErrorPayment();
                            });

                    } catch (error) {
                        setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
                        handleOpenModalErrorPayment();
                    }
                }

            })
                .catch((erro) => {
                    console.error(erro);
                    setMenssageErrorPayment("OPS... Algo deu de errado ao gerar a chave PIX e o QR Code para o pagamento do seu pedido.");
                    handleOpenModalErrorPayment();
                });

        } catch (error) {
            console.log(error);
            setMenssageErrorPayment("OPS... Algum erro ao gerar seu pedido, favor, entre em contato conosco para saber detalhes da situação do seu pedido.");
            handleOpenModalErrorPayment();
        }
    }



    return (
        <>
            <Head>
                <title>Pagamento</title>
            </Head>

            {loadingPayment ? (
                <Loading />
            ) :
                null
            }

            {loadingCupom ? (
                <Loading />
            ) :
                null
            }

            {loadingFreteEdit ? (
                <Loading />
            ) :
                null
            }

            {loadingNewFrete ? (
                <Loading />
            ) :
                null
            }

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
                                                placeholder={phones}
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
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
                                                        type="text"
                                                        placeholder={cnpjs}
                                                        value={cnpj}
                                                        maxLength={18}
                                                        onChange={handleCnpjChange}
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
                                                        type="text"
                                                        placeholder={cpfs}
                                                        value={cpf}
                                                        onChange={handleCPFChange}
                                                        maxLength={14}
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
                                                        placeholder={dataNascimentos}
                                                        value={dateOfBirth}
                                                        onChange={handleDateChange}
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
                            <>
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
                            </>
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

                    <BoxPayment
                        style={{ display: display1 }}
                    >
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
                    <BoxPaymentEnvio>
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

                            {loadingFrete ? (
                                <>
                                    <ErrorText>Espere um momento estamos calculando o frete para você se esse processo demorar muito, recarregue a página...</ErrorText>
                                    <br />
                                    <br />
                                </>
                            ) :
                                <Total
                                    style={{ fontSize: '20px' }}
                                >
                                    <DeliverySpan><Days>{daysDelivery}</Days></DeliverySpan>
                                </Total>
                            }

                        </BoxPricesFinal>
                    </BoxPaymentEnvio>
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
                                                backgroundColor: colorPay === item.id ? "orange" : "white", display: item.view
                                            }}
                                            onClick={() => handleChosePayment(item.id)}
                                        >
                                            <br />
                                            {item.pay_name}
                                            <Image style={{ display: item.view }} src={item.icon_pay} height={70} width={85} alt="pagar" />
                                        </PayIcon>
                                    </>
                                )
                            })}
                        </BoxIconsPayment>
                        <br />
                        <br />
                        {activePayment === "boleto" ?

                            <BoxFinalCart>
                                <TextCurrentBold style={{ fontSize: '19px', marginBottom: '10px' }}>Total a pagar: </TextCurrentBold>
                                <TextCurrent style={{ color: 'red', fontSize: '19px' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}</TextCurrent>
                                <Button
                                    style={{ margin: '30px', width: '80%' }}
                                    onClick={handleRegisterBoleto}
                                >
                                    FINALIZAR COMPRA<br />E GERAR BOLETO
                                </Button>
                            </BoxFinalCart>

                            :
                            null
                        }

                        {activePayment === "cartao_de_credito" ?
                            <BoxDataCard>
                                <BoxCard>
                                    <CreditCardInput
                                        cardNumberInputProps={{ value: numeroCartao, onChange: (e: any) => setNumeroCartao(e.target.value) }}
                                        cardExpiryInputProps={{ value: dataExpiracao, onChange: (e: any) => setDataExpiracao(e.target.value) }}
                                        cardCVCInputProps={{ value: numeroSeguranca, onChange: (e: any) => setNumeroSeguranca(e.target.value) }}
                                        fieldClassName="input"
                                        customTextLabels={{
                                            invalidCardNumber: 'Número de cartão inválido',
                                            expiryError: {
                                                invalidExpiryDate: 'A data de validade é inválida',
                                                monthOutOfRange: 'O mês de validade deve ser entre 01 e 12',
                                                yearOutOfRange: 'O ano de validade não pode estar no passado',
                                                dateOutOfRange: 'A data de validade não pode estar no passado'
                                            },
                                            invalidCvc: 'O código de segurança é inválido',
                                            invalidZipCode: 'O CEP é inválido',
                                            cardNumberPlaceholder: 'Número do cartão',
                                            expiryPlaceholder: 'MM/AA',
                                            cvcPlaceholder: 'COD',
                                            zipPlaceholder: 'C.P.'
                                        }}
                                    />
                                </BoxCard>
                                <ErrorCard>{errorNumberCardHolderCard}</ErrorCard>
                                <ErrorCard>{errorDataCardHolderCard}</ErrorCard>
                                <ErrorCard>{errorCVCCardHolderCard}</ErrorCard>

                                <BoxCardCustomer>
                                    <InputPropetyNameCard
                                        type="text"
                                        placeholder="Nome do titular"
                                        value={nomeTitular}
                                        onChange={(e) => setNomeTitular(e.target.value)}
                                    />
                                    <ErrorCard>{errorNameHolderCard}</ErrorCard>
                                </BoxCardCustomer>

                                <BoxCard style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <LabelForm>Tipo de Documento:</LabelForm>
                                    <SelectCardData
                                        value={tipoDocumento}
                                        onChange={(e) => setTipoDocumento(e.target.value)}
                                    >
                                        <option value="CPF">CPF</option>
                                        <option value="CNPJ">CNPJ</option>
                                    </SelectCardData>
                                </BoxCard>

                                {tipoDocumento === "CNPJ" ?
                                    <BoxCard>
                                        <LabelForm>Número do Documento</LabelForm>
                                        <BoxDataCardCode
                                            type="text"
                                            value={cpfOrCnpjPay}
                                            placeholder="Digite o CNPJ"
                                            maxLength={18}
                                            onChange={handleCnpjPayChange}
                                        />
                                        <ErrorCard>{errorDocumentHolderCard}</ErrorCard>
                                    </BoxCard>
                                    :
                                    <>
                                        <BoxCard>
                                            <LabelForm>Número do Documento</LabelForm>
                                            <BoxDataCardCode
                                                type="text"
                                                value={cpfOrCnpjPay}
                                                placeholder="Digite o CPF"
                                                maxLength={14}
                                                onChange={handleCPFPayChange}
                                            />
                                        </BoxCard>
                                        <ErrorCard>{errorDocumentHolderCard}</ErrorCard>
                                    </>
                                }

                                <BoxCard style={{ display: 'inline-flex' }}>
                                    <LabelForm>Selecione o número de parcelas:</LabelForm>
                                    <SelectParcelasCardPay
                                        value={parcelaSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangeParcela}
                                        opcoes={
                                            [
                                                ...(parcelas || []).map((item) => ({ label: item.numeroParcelas + "x - R$" + item.valor, value: [item.numeroParcelas, item.valor] }))
                                            ]
                                        }
                                    />
                                </BoxCard>

                                <BoxCard style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <Button
                                        onClick={handleRegisterCardPay}
                                    >
                                        Efetuar Pagamento
                                    </Button>
                                </BoxCard>
                            </BoxDataCard>
                            :
                            null
                        }

                        {activePayment === "pix" ?
                            <BoxFinalCart>
                                <TextCurrentBold style={{ fontSize: '19px', marginBottom: '10px' }}>Total a pagar: </TextCurrentBold>
                                <TextCurrent style={{ color: 'red', fontSize: '19px' }}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFinishCart)}</TextCurrent>
                                <Button
                                    style={{ margin: '30px', width: '80%' }}
                                    onClick={handleRegisterPix}
                                >
                                    FINALIZAR COMPRA<br />E GERAR CHAVE PIX
                                </Button>
                            </BoxFinalCart>
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
                    deliverys={modalItem}
                    lastCustomerDelivery={lastCustomerDelivery}
                    refresh={refresh}
                    deliverysFunc={deliverys}
                />
            )}

            {modalVisibleErrorPayment && (
                <ModalErrorPayment
                    isOpen={modalVisibleErrorPayment}
                    onRequestClose={handleCloseModal}
                    menssage={menssageErrorPayment}
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
})