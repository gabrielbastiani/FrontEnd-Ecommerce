import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContAvaliacao, ContainerContent, OpcoesAvaliacao, SelectAvaliacao, TextAreaAvaliacao } from './styles';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { ButtonCreateAccount, ContLogin, Formulario, LinkCreateAccount, Recaptcha, TextInfo, TextLink } from '../../../pages/loginClient/styles';
import Titulos from '../../Titulos';
import { IMaskInput } from "react-imask";
import { Input } from '../../ui/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '../../ui/Button';
import Link from 'next/link';
import { BlockInputs, EtiquetaInput } from '../../../pages/createAccount/styles';
import { setupAPIClient } from '../../../services/api';
import Router from 'next/router';
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

    const [addresseeSelected, setAddresseeSelected] = useState("");
    const [numeroSelected, setNumeroSelected] = useState("");
    const [referenceSelected, setReferenceSelected] = useState("");
    const [complementSelected, setComplementSelected] = useState("");

    const [searchAddress, setSearchAddress] = useState<CepProps>();
    const [cepBusca, setCepBusca] = useState("");

    const [deliveryEdits, setDeliveryEdits] = useState(false);
    const [cepLoadEdit, setCepLoadEdit] = useState(false);

    const handleDelivery = () => {
        setDeliveryEdits(!deliveryEdits);
    }

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

    console.log(deliverys)

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

            toast.success("Endereço de entrega alterado com sucesso");

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
                <button
                    onClick={loadCep}
                >
                    Buscar
                </button>

                {cepLoadEdit ?
                    <div>
                        <input
                            value={addresseeSelected}
                            onChange={(e) => setAddresseeSelected(e.target.value)}
                        />

                        <div>
                            <span>{searchAddress?.logradouro}</span>

                            <input
                                value={numeroSelected}
                                onChange={(e) => setNumeroSelected(e.target.value)}
                            />
                        </div>

                        <div>
                            <strong>Complemento: </strong>
                            <input
                                value={complementSelected}/* @ts-ignore */
                                onChange={(e) => setComplementSelected(e.target.value)}
                            />
                        </div>

                        <div>
                            <strong>Bairro: </strong>
                            <span>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</span>
                        </div>

                        <div>
                            <strong>Referencia: </strong>
                            <input
                                value={referenceSelected}/* @ts-ignore */
                                onChange={(e) => setReferenceSelected(e.target.value)}
                            />
                        </div>

                        <span>{searchAddress?.localidade} - {searchAddress?.uf}</span>

                        <span><strong>CEP: </strong>{searchAddress?.cep}</span>

                        <button
                            onClick={updateDelivery}
                        >
                            Salvar alterações
                        </button>

                        <button
                            onClick={handleCepEdit}
                        >
                            Cancelar
                        </button>
                    </div>
                    :
                    <div>
                        <input
                            value={addresseeSelected}
                            onChange={(e) => setAddresseeSelected(e.target.value)}
                        />

                        <div>
                            <span>{searchAddress?.logradouro}</span>

                            <input
                                value={numeroSelected}
                                onChange={(e) => setNumeroSelected(e.target.value)}
                            />
                        </div>

                        <div>
                            <strong>Complemento: </strong>
                            <input
                                value={complementSelected}/* @ts-ignore */
                                onChange={(e) => setComplementSelected(e.target.value)}
                            />
                        </div>

                        <div>
                            <strong>Bairro: </strong>
                            <span>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</span>
                        </div>

                        <div>
                            <strong>Referencia: </strong>
                            <input
                                value={referenceSelected}/* @ts-ignore */
                                onChange={(e) => setReferenceSelected(e.target.value)}
                            />
                        </div>

                        <span>{searchAddress?.localidade} - {searchAddress?.uf}</span>

                        <span><strong>CEP: </strong>{searchAddress?.cep}</span>

                    </div>
                }

            </ContainerContent>

        </Modal >
    )
}