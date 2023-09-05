import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent } from './styles';
import { useState } from 'react';
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
    InputDelivery,
    TextCurrent,
    TextCurrentBold,
    TextCurrentInput
} from '../../../pages/payment/styles';
import { AiOutlineCompass } from 'react-icons/ai';


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

    console.log(deliverys)

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

    const [addresseeSelected, setAddresseeSelected] = useState(deliverys.addressee);
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

    async function updateDelivery() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/customer/delivery/updateAllDateDeliveryAddressCustomer?deliveryAddressCustomer_id=${deliverys?.id}`, {
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

            toast.success("Dados(s) de entrega alterado com sucesso");

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
                        titulo='Insira um novo CEP abaixo se deseja mudar o endereço atual'
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
                        <InputDelivery
                            value={addresseeSelected}
                            onChange={(e) => setAddresseeSelected(e.target.value)}
                        />

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
                                value={complementSelected}/* @ts-ignore */
                                onChange={(e) => setComplementSelected(e.target.value)}
                            />
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</TextCurrent>

                        <BoxInputs>
                            <TextCurrentBold>Referencia: </TextCurrentBold>
                            <InputDelivery
                                value={referenceSelected}/* @ts-ignore */
                                onChange={(e) => setReferenceSelected(e.target.value)}
                            />
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{searchAddress?.localidade} - {searchAddress?.uf}</TextCurrent>

                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{searchAddress?.cep}</TextCurrent>

                        <BoxButtonsFunctions>
                            <ButtonDelivery
                                style={{ backgroundColor: 'green' }}
                                onClick={updateDelivery}
                            >
                                Salvar alterações
                            </ButtonDelivery>

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
                        <InputDelivery
                            value={addresseeSelected}
                            onChange={(e) => setAddresseeSelected(e.target.value)}
                        />
                        <br />
                        <BoxInputs>
                            <TextCurrentInput><AiOutlineCompass color="black" size={20} /> {deliverys.address}</TextCurrentInput>

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

                        <TextCurrent><TextCurrentBold>Bairro: </TextCurrentBold>{deliverys.neighborhood ? deliverys.neighborhood : "Sem bairro"}</TextCurrent>

                        <BoxInputs>
                            <TextCurrentBold>Referencia: </TextCurrentBold>
                            <InputDelivery
                                value={referenceSelected}/* @ts-ignore */
                                onChange={(e) => setReferenceSelected(e.target.value)}
                            />
                        </BoxInputs>

                        <TextCurrent><TextCurrentBold>Cidade: </TextCurrentBold>{deliverys.city} - {deliverys.state}</TextCurrent>

                        <TextCurrent><TextCurrentBold>CEP: </TextCurrentBold>{deliverys.cep}</TextCurrent>

                        <ButtonDelivery
                            style={{ backgroundColor: 'green', width: '100%' }}
                            onClick={updateDelivery}
                        >
                            Salvar alterações
                        </ButtonDelivery>

                    </BoxDelivery>
                }
            </ContainerContent>

        </Modal >
    )
}