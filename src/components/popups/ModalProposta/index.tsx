import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent, ContatinerProposal, TextAreaAvaliacao } from './styles';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { ButtonCreateAccount, ContLogin, Formulario, LinkCreateAccount, Recaptcha, TextInfo, TextLink } from '../../../pages/loginClient/styles';
import Titulos from '../../Titulos';
import { Input } from '../../ui/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '../../ui/Button';
import Link from 'next/link';
import { BlockInputs, EtiquetaInput } from '../../../pages/createAccount/styles';
import { setupAPIClient } from '../../../services/api';
import Router from 'next/router';
import { IMaskInput } from "react-imask";
import { SectionDate } from '../../dateClientUx/SectionDates/styles';
import GridDate from '../../dateClientUx/GridDates';

interface PropostaRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    priceProduct: number;
    nameProduct: string;
    skuProduct: string;
}

export function ModalProposta({ isOpen, onRequestClose, priceProduct, nameProduct, skuProduct }: PropostaRequest) {

    const price = String(priceProduct);

    const customStyles = {
        content: {
            top: '49%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px'
        }
    };

    const [iDStore, setIDStore] = useState("");
    const [counterOfferPrice, setCounterOfferPrice] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lowestPricePlace, setLowestPricePlace] = useState("");
    const [moreInformation, setMoreInformation] = useState("");


    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/store`);
                setIDStore(response?.data?.id || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    function isEmail(email: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
    };

    async function handleRegisterProposta() {
        try {
            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.post('/createCounterProposal', {/* @ts-ignore */
                currentPrice: Number(price.replace(/[^\d]+/g, '')),/* @ts-ignore */
                counterOfferPrice: Number(counterOfferPrice.replace(/[^\d]+/g, '')),
                name: name,
                email: email,
                phone: phone,
                lowestPricePlace: lowestPricePlace,
                moreInformation: moreInformation,
                sku: skuProduct,
                nameProduct: nameProduct,
                status: "Pendente",
                store_id: iDStore
            });

            toast.success('Sua contraproposta foi enviada com sucesso... Em breve retornamos contato com você.');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
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
                <ContatinerProposal>
                    <Titulos
                        tipo='h1'
                        titulo={`Contraproposta para ${nameProduct}`}
                    />

                    <GridDate>
                        <SectionDate>
                            <BlockInputs>
                                <EtiquetaInput>Preço atual do produto:</EtiquetaInput>
                                <Input
                                    value={priceProduct.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Preço da contraproposta:</EtiquetaInput>
                                <Input
                                    maxLength={10}
                                    placeholder="Digite aqui o valor sem pontos e sem virgulas"
                                    value={counterOfferPrice}/* @ts-ignore */
                                    onChange={(e) => setCounterOfferPrice(e.target.value)}
                                />
                            </BlockInputs>
                        </SectionDate>

                        <SectionDate>
                            <BlockInputs>
                                <EtiquetaInput>Nome Completo:</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Nome Completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>E-mail para contato:</EtiquetaInput>
                                <Input
                                    name='email'
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </BlockInputs>
                        </SectionDate>
                    </GridDate>

                    <BlockInputs>
                        <EtiquetaInput>Telefone:</EtiquetaInput>
                        <Input
                            /* @ts-ignore */
                            as={IMaskInput}
                            /* @ts-ignore */
                            mask="(00) 0000-0000"
                            type="text"
                            placeholder="(00) 0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </BlockInputs>

                    <BlockInputs>
                        <EtiquetaInput>Onde se encontra com o menor preço (Digite abaixo o link do site onde o valor está melhor que o nosso, ou o nome da loja):</EtiquetaInput>
                        <Input
                            type="text"
                            placeholder="Digite aqui..."
                            value={lowestPricePlace}
                            onChange={(e) => setLowestPricePlace(e.target.value)}
                        />
                    </BlockInputs>

                    <BlockInputs>
                        <EtiquetaInput>Adicionar mais informações a proposta:</EtiquetaInput>
                        <TextAreaAvaliacao
                            placeholder="Digite aqui..."
                            value={moreInformation}
                            onChange={(e) => setMoreInformation(e.target.value)}
                        />
                    </BlockInputs>

                    <Button
                        style={{ backgroundColor: 'green' }}
                        onClick={handleRegisterProposta}
                    >
                        Enviar contraproposta
                    </Button>
                </ContatinerProposal>
            </ContainerContent>
        </Modal >
    )
}