import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContAvaliacao, ContainerContent, OpcoesAvaliacao, SelectAvaliacao, TextAreaAvaliacao } from './styles';
import { FormEvent, useContext, useRef, useState } from 'react';
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


interface LoginRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    productId: string;
    productName: string;
}

export function ModalLoginAvalie({ isOpen, onRequestClose, productId, productName }: LoginRequest) {

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

    const { signInAvalie, isAuthenticated, customer } = useContext(AuthContext);

    const [storeID] = useState(customer?.store_id);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userValid, setUserValid] = useState(false);
    const captcha = useRef(null);

    const [description, setDescription] = useState('');

    const [avaliacaoSelected, setAvaliacaoSelected] = useState();

    function handleChangeAvaliacao(e: any) {
        setAvaliacaoSelected(e.target.value);
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (captcha.current.getValue()) {
            console.log('Usuario válido!');
            setUserValid(true);
        } else {
            console.log('Por favor, acerte o recaptcha!');
            toast.error('Por favor, acerte o recaptcha!');

            return;
        }
        /* @ts-ignore */
        if (email === '' || password === '') {
            toast.warning('Preencha os campos! (Email e Senha)');
            return;
        }

        setLoading(true);

        let data = {
            email,
            password
        }
        /* @ts-ignore */
        await signInAvalie(data);

        setLoading(false);

    }

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('Usuario não é um robo!');
        }
    }

    async function handleRegisterAvaliacao() {
        try {
            if (description === "") {
                toast.error('Preencha a descrição');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.post('/createAvalietion', {
                customer_id: customer?.id,
                product_id: productId,
                description: description,
                point: String(avaliacaoSelected),
                status: "Pendente",
                store_id: storeID
            });

            toast.success('Sua avaliação foi cadastrada com sucesso para esse nosso produto.');

            onRequestClose();

            setTimeout(() => {
                Router.reload();
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
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

                {isAuthenticated ? (
                    <>
                        <ContAvaliacao>
                            <Titulos
                                tipo='h1'
                                titulo={`Avaliar produto ${productName}`}
                            />

                            <BlockInputs>
                                <EtiquetaInput>Avaliação</EtiquetaInput>
                                <SelectAvaliacao
                                    value={avaliacaoSelected}
                                    onChange={handleChangeAvaliacao}
                                >
                                    <OpcoesAvaliacao value="">Selecione...</OpcoesAvaliacao>
                                    <OpcoesAvaliacao value="Péssimo">Péssimo</OpcoesAvaliacao>
                                    <OpcoesAvaliacao value="Ruim">Ruim</OpcoesAvaliacao>
                                    <OpcoesAvaliacao value="Bom">Bom</OpcoesAvaliacao>
                                    <OpcoesAvaliacao value="Ótimo">Ótimo</OpcoesAvaliacao>
                                    <OpcoesAvaliacao value="Excelente">Excelente</OpcoesAvaliacao>
                                </SelectAvaliacao>
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Descreva abaixo seu relato</EtiquetaInput>
                                <TextAreaAvaliacao
                                    placeholder="Digite aqui..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </BlockInputs>

                            <Button
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterAvaliacao}
                            >
                                Avaliar
                            </Button>

                        </ContAvaliacao>
                    </>
                ) :
                    <>
                        <ContLogin
                            style={{ marginTop: '-50px' }}
                        >
                            <Formulario onSubmit={handleLogin}>
                                <TextInfo>Se você já possui cadastro na loja, informe seu e-mail e senha para continuar com a avaliação do produto.</TextInfo>
                                <Input
                                    placeholder='Digite seu email'
                                    type='text'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    placeholder='Digite sua senha'
                                    type='password'
                                    /* @ts-ignore */
                                    value={password}
                                    /* @ts-ignore */
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Recaptcha>
                                    <ReCAPTCHA
                                        ref={captcha}
                                        sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                                        onChange={onChange}
                                    />
                                </Recaptcha>

                                <Button
                                    type="submit"
                                    loading={loading}
                                >
                                    Acessar
                                </Button>

                            </Formulario>

                            <Link
                                style={{ marginBottom: "10px" }}
                                href="/recoveryPassword">
                                <TextLink>Esqueceu sua senha?</TextLink>
                            </Link>

                            <Titulos
                                tipo="h3"
                                titulo="Ainda não tem uma conta na loja?"
                            />

                            <ButtonCreateAccount>
                                <LinkCreateAccount
                                    href="/createAccount"
                                >
                                    Cadastre-se aqui!
                                </LinkCreateAccount>
                            </ButtonCreateAccount>
                        </ContLogin>
                    </>
                }

            </ContainerContent>
        </Modal >
    )
}