import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent } from './styles';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Titulos from '../../Titulos';
import { IMaskInput } from "react-imask";
import { Input } from '../../ui/Input';
import { setupAPIClient } from '../../../services/api';
import {
    BoxButtonsFunctions,
    BoxDelivery,
    BoxInputs,
    ButtonDelivery,
    TextCurrent,
    TextCurrentBold,
    TextCurrentInput
} from '../../../pages/payment/styles';
import { AiOutlineCompass } from 'react-icons/ai';
import { InputUpdate } from '../../ui/InputUpdate';
import { CartContext } from '../../../contexts/CartContext';
import router from 'next/router';


interface DeliverysRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    deliverys: any;
}

type CepProps = {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

export function ModalDeliveryEdit({ isOpen, onRequestClose, deliverys }: DeliverysRequest) {

    const { cartProducts, productsCart, totalCart } = useContext(CartContext);

    const customStyles = {
        content: {
            top: '57%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px'
        }
    };

    const [addressSelected, setAddressSelected] = useState(deliverys.address);
    const [addresseeSelected, setAddresseeSelected] = useState(deliverys.addressee);
    const [bairroSelected, setBairroSelected] = useState(deliverys.neighborhood);
    const [numeroSelected, setNumeroSelected] = useState(deliverys.number);
    const [referenceSelected, setReferenceSelected] = useState(deliverys.reference);
    const [complementSelected, setComplementSelected] = useState(deliverys.complement);

    const [searchAddress, setSearchAddress] = useState<CepProps>();
    const [cepBusca, setCepBusca] = useState("");

    const [cepLoadEdit, setCepLoadEdit] = useState(false);

    const handleCepEdit = () => {
        setCepLoadEdit(!cepLoadEdit);
    }

    async function loadCep() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });

            setSearchAddress(response?.data);

            handleCepEdit();

        } catch (error) {
            console.log(error)
        }
    }

    async function updateDestinySelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
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
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
                address: searchAddress?.logradouro ? searchAddress?.logradouro : addressSelected
            });
            toast.success("Endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateNumberSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
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
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
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
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
                neighborhood: searchAddress?.bairro ? searchAddress?.bairro : bairroSelected
            });
            toast.success("Bairro de endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

    async function updateReferenceSelectedDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
                reference: referenceSelected
            });
            toast.success("Referencia do endereço atual alterado com sucesso");

        } catch (error) {
            console.log(error);
        }
    }

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

    async function updateDelivery() {
        const apiClient = setupAPIClient();
        const cep = searchAddress?.cep;
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
                cep: searchAddress?.cep,
                neighborhood: searchAddress?.bairro ? searchAddress?.bairro : bairroSelected,
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

            toast.success("Endereço atual alterado com sucesso");


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <ButtonClose
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </ButtonClose>

            <ContainerContent>

                <BoxDelivery>
                    <Titulos
                        tipo='h4'
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
                        onClick={loadCep}
                    >
                        Buscar
                    </ButtonDelivery>
                </BoxDelivery>

                {cepLoadEdit ?
                    <BoxDelivery>
                        <br />
                        <TextCurrent>{addresseeSelected}</TextCurrent>

                        <BoxInputs>
                            <AiOutlineCompass color="black" size={20} />
                            <InputUpdate
                                dado={searchAddress?.logradouro ? searchAddress?.logradouro : addressSelected}
                                type="text"
                                placeholder={searchAddress?.logradouro ? searchAddress?.logradouro : addressSelected}
                                value={searchAddress?.logradouro ? searchAddress?.logradouro : addressSelected}
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
                                dado={searchAddress?.bairro ? searchAddress?.bairro : bairroSelected}
                                type="text"
                                placeholder={searchAddress?.bairro ? searchAddress?.bairro : bairroSelected}
                                value={searchAddress?.bairro ? searchAddress?.bairro : bairroSelected}
                                onChange={(e) => setBairroSelected(e.target.value)}
                                handleSubmit={updateBairroSelectedDelivery}
                            />
                        </BoxInputs>

                        <BoxInputs>
                            <TextCurrentBold>Referencia: </TextCurrentBold>
                            <TextCurrent>{referenceSelected}</TextCurrent>
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddress?.localidade} - {searchAddress?.uf}</TextCurrent>

                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddress?.cep}</TextCurrent>

                        <BoxButtonsFunctions>
                            {searchAddress?.cep ?
                                <ButtonDelivery
                                    style={{ backgroundColor: 'green', color: 'white' }}
                                    onClick={updateDelivery}
                                >
                                    Salvar novo CEP<br />e valor de frete
                                </ButtonDelivery>
                                :
                                null
                            }

                            <ButtonDelivery
                                style={{ backgroundColor: 'red' }}
                                onClick={handleCepEdit}
                            >
                                Cancelar
                            </ButtonDelivery>
                        </BoxButtonsFunctions>

                    </BoxDelivery>
                    :
                    <BoxDelivery>
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
                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {deliverys.address}</TextCurrentInput>

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

                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{deliverys.neighborhood ? deliverys.neighborhood : "Sem bairro"}</TextCurrent>

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

                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{deliverys.city} - {deliverys.state}</TextCurrent>

                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{deliverys.cep}</TextCurrent>

                    </BoxDelivery>
                }
            </ContainerContent>

        </Modal >
    )
}