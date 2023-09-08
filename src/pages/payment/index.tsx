import { PUBLIC_KEY_TEST, URL_NOTIFICATION } from "../../utils/config";
import { FormEvent, useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { HeaderCart } from "../../components/HeaderCart";
import Head from "next/head";
import FooterAccount from "../../components/FooterAccount";
import logoCorreios from "../../assets/correios-logo.png";
import {
    AddressTextIcon,
    BackButton,
    BoxButtons,
    BoxButtonsData,
    BoxButtonsFunctions,
    BoxData,
    BoxDelivery,
    BoxDeliverySelected,
    BoxInputs,
    BoxPayment,
    BoxTitle,
    ButtonDelivery,
    ButtonsData,
    ContainerFechamento,
    Datas,
    DestinyName,
    EditDelivery,
    InputDelivery,
    SectionPayment,
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
import { BoxPricesFinal, Total } from "../carrinho/styles";


type CepProps = {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

export default function Payment() {

    const { cartProducts, productsCart, totalCart, totalFinishCart, cepCustomer } = useContext(CartContext);
    const { customer, signOutPayment } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [searchAddress, setSearchAddress] = useState<CepProps>();
    const [searchAddressEdit, setSearchAddressEdit] = useState<CepProps>();

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

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

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

    const cep = searchAddress?.cep;

    async function handleNewDeliveryCustomer() {
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

            toast.success("Novo endereço cadastrado com sucesso");
            const cepfrete = cep;
            /* @ts-ignore */
            cepCustomer(cepfrete);

            closenewDelivery();

            setTimeout(() => {
                router.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        }
    }

    async function updateSelectedDelivery() {
        const apiClient = setupAPIClient();
        const cep = searchAddressEdit?.cep;
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${idSelected}`, {
                addressee: addresseeSelected,
                address: searchAddressEdit?.logradouro,
                number: numeroSelected,
                neighborhood: searchAddressEdit?.bairro ? searchAddressEdit?.bairro : "Sem bairro",
                complement: complementSelected,
                reference: referenceSelected,
                cep: searchAddressEdit?.cep,
                city: searchAddressEdit?.localidade,
                state: searchAddressEdit?.uf
            });

            toast.success("Endereço atual alterado com sucesso");

            const cepfrete = cep;
            /* @ts-ignore */
            cepCustomer(cepfrete);

            handleDelivery();

            setTimeout(() => {
                router.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        }
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
    }, [customer_id])

    useEffect(() => {
        const initializeMercadoPago = async () => {
            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            const cardForm = mp.cardForm({
                amount: String(totalFinishCart),
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
                            identificationType,
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
                                    description: "Descrição do produto",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
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

    }, []);

    useEffect(() => {

        const initializeBoleto = async () => {

            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            try {
                const identificationTypes = await mp.getIdentificationTypes();
                const identificationTypeElement = document.getElementById('form-checkout__identificationTypeBoleto');

                createSelectOptions(identificationTypeElement, identificationTypes);

            } catch (e) {
                return console.error('Error getting identificationTypes: ', e);
            }

            function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
                const { label, value } = labelsAndKeys;

                elem.options.length = 0;

                const tempOptions = document.createDocumentFragment();

                options.forEach(option => {
                    const optValue = option[value];
                    const optLabel = option[label];

                    const opt = document.createElement('option');
                    opt.value = optValue;
                    opt.textContent = optLabel;

                    tempOptions.appendChild(opt);
                });

                elem.appendChild(tempOptions);
            }
        }

        initializeBoleto();

    }, []);

    useEffect(() => {

        const initializePix = async () => {

            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            try {
                const identificationTypes = await mp.getIdentificationTypes();
                const identificationTypeElement = document.getElementById('form-checkout__identificationTypePix');

                createSelectOptions(identificationTypeElement, identificationTypes);
            } catch (e) {
                return console.error('Error getting identificationTypes: ', e);
            }

            function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
                const { label, value } = labelsAndKeys;

                elem.options.length = 0;

                const tempOptions = document.createDocumentFragment();

                options.forEach(option => {
                    const optValue = option[value];
                    const optLabel = option[label];

                    const opt = document.createElement('option');
                    opt.value = optValue;
                    opt.textContent = optLabel;

                    tempOptions.appendChild(opt);
                });

                elem.appendChild(tempOptions);
            }

        }

        initializePix();

    }, []);

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
                    transaction_amount: totalFinishCart,
                    description: store,
                    payment_method_id: 'bolbradesco',
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
                    notification_url: URL_NOTIFICATION
                }),
            });

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }

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
                    transaction_amount: totalFinishCart,
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
                    notification_url: URL_NOTIFICATION
                }),
            });

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }

    async function updateCurrentDelivery(customer_id: string, id: string, cep: string) {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateCurrentDelivery?customer_id=${customer_id}&deliveryAddressCustomer_id=${id}`);
            const cepfrete = cep;
            /* @ts-ignore */
            cepCustomer(cepfrete);

            toast.success('Endereço de entrega escolhido com sucesso')

            setTimeout(() => {
                router.reload();
            }, 3000);

        } catch (error) {
            console.log(error.response.data);
        }
    }

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

    const documentEdit = removerAcentos(cpfCnpj);

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
                                <Titulos tipo="h3" titulo="Editar Informações Pessoais" />
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
                                <Titulos tipo="h3" titulo="Informações Pessoais" />
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
                        <Titulos tipo="h3" titulo="Endereço de Entrega" />
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
                                                    titulo="Insira um novo CEP se deseja mudar o endereço atual"
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
                                                        <InputDelivery
                                                            value={addresseeSelected}
                                                            onChange={(e) => setAddresseeSelected(e.target.value)}
                                                        />
                                                        <br />
                                                        <BoxInputs>
                                                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {searchAddressEdit?.logradouro} - </TextCurrentInput>

                                                            <InputDelivery
                                                                value={numeroSelected}
                                                                onChange={(e) => setNumeroSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Complemento: </TextCurrentBold>
                                                            <InputDelivery
                                                                value={complementSelected}/* @ts-ignore */
                                                                onChange={(e) => setComplementSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{searchAddressEdit?.bairro ? searchAddressEdit?.bairro : "Sem bairro"}</TextCurrent>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Referencia: </TextCurrentBold>
                                                            <InputDelivery
                                                                value={referenceSelected}/* @ts-ignore */
                                                                onChange={(e) => setReferenceSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddressEdit?.localidade} - {searchAddressEdit?.uf}</TextCurrent>

                                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddressEdit?.cep}</TextCurrent>
                                                    </>
                                                    :
                                                    <>
                                                        <br />
                                                        <InputDelivery
                                                            value={addresseeSelected}
                                                            onChange={(e) => setAddresseeSelected(e.target.value)}
                                                        />
                                                        <br />
                                                        <BoxInputs>
                                                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {addressSelected} - </TextCurrentInput>

                                                            <InputDelivery
                                                                value={numeroSelected}
                                                                placeholder="Numero"
                                                                onChange={(e) => setNumeroSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Complemento: </TextCurrentBold>
                                                            <InputDelivery
                                                                value={complementSelected}/* @ts-ignore */
                                                                onChange={(e) => setComplementSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{bairroSelected}</TextCurrent>

                                                        <BoxInputs>
                                                            <TextCurrentBold>Referencia: </TextCurrentBold>
                                                            <InputDelivery
                                                                value={referenceSelected}/* @ts-ignore */
                                                                onChange={(e) => setReferenceSelected(e.target.value)}
                                                            />
                                                        </BoxInputs>

                                                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{citySelected} - {estadosSelected}</TextCurrent>
                                                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{cepSelected}</TextCurrent>
                                                    </>
                                                }
                                                <BoxButtonsFunctions>
                                                    <ButtonDelivery
                                                        style={{ backgroundColor: 'green', color: 'white' }}
                                                        onClick={updateSelectedDelivery}
                                                    >
                                                        Salvar alterações
                                                    </ButtonDelivery>

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
                        <Titulos tipo="h3" titulo="Resumo do Pedido" />
                        <br />
                        {productsCart.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <Image src={'http://localhost:3333/files/' + item?.product?.photoproducts[0]?.image} width={80} height={80} alt={item?.product?.name} />
                                        <div>
                                            <h4>{item?.product?.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <BoxPricesFinal>
                            <Total
                                style={{ fontSize: '19px' }}
                            >
                                SUBTOTAL
                            </Total>
                            <Total
                                style={{ fontSize: '19px'}}
                            >
                                {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}
                            </Total>
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

                    </BoxPayment>
                </ContainerFechamento>

                <ContainerFechamento>
                    <BoxPayment>
                        <Titulos tipo="h3" titulo="Envio" />
                        <br />
                        <Image src={logoCorreios} height={80} width={300} alt="envio-correios" />
                    </BoxPayment>
                    <BoxPayment>
                        <Titulos tipo="h3" titulo="Formas de Pagamento" />
                        <br />
                    </BoxPayment>
                </ContainerFechamento>
            </SectionPayment>


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

                    <button
                        type="submit"
                        id="form-checkout__submit"
                        className="container"
                    >
                        Pagar
                    </button>
                    <progress value="0" className="progress-bar">
                        Carregando...
                    </progress>
                </form>
            </div>

            <br />

            <h2>Boleto Bancario</h2>

            <div>

                <form id="form-checkoutBoleto" onSubmit={handleRegisterBoleto}>
                    <div>
                        <div>
                            <label htmlFor="payerFirstName">Nome</label>
                            <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="payerLastName">Sobrenome</label>
                            <input id="form-checkout__payerLastName" name="payerLastName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input id="form-checkout__email" name="email" type="text" />
                        </div>
                        <div>
                            <label htmlFor="identificationType">Tipo de documento</label>
                            <select id="form-checkout__identificationTypeBoleto" name="identificationType"></select>
                        </div>
                        <div>
                            <label htmlFor="identificationNumber">Número do documento</label>
                            <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                            <input type="hidden" name="description" id="description" value="Nome do Produto" />
                            <br />
                            <button id="form-checkoutBoleto" type="submit">Pagar</button>
                        </div>
                    </div>
                </form>

            </div>

            <h2>PIX</h2>

            <div>

                <form id="form-checkoutPix" onSubmit={handleRegisterPix}>
                    <div>
                        <div>
                            <label htmlFor="payerFirstName">Nome</label>
                            <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="payerLastName">Sobrenome</label>
                            <input id="form-checkout__payerLastName" name="payerLastName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input id="form-checkout__email" name="email" type="text" />
                        </div>
                        <div>
                            <label htmlFor="identificationType">Tipo de documento</label>
                            <select id="form-checkout__identificationTypePix" name="identificationType"></select>
                        </div>
                        <div>
                            <label htmlFor="identificationNumber">Número do documento</label>
                            <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                            <input type="hidden" name="description" id="description" value="Nome do Produto" />
                            <br />
                            <button id="form-checkoutPix" type="submit">Pagar</button>
                        </div>
                    </div>
                </form>

            </div>

            <br />
            <br />
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});