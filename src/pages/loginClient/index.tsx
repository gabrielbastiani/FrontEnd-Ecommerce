import { useContext, useState, useRef, FormEvent } from 'react';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    ContLogin,
    ContainerCenter,
    Recaptcha,
    Formulario,
    TextLink,
    LinkCreateAccount,
    ButtonCreateAccount,
    TextInfo
} from './styles';
import { Input } from '../../components/ui/Input';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import Head from 'next/head';
import { canSSRGuest } from '../../utils/canSSRGuest';
import FooterAccount from '../../components/FooterAccount';
import { HeaderAccount } from '../../components/HeaderAccount';
import Titulos from '../../components/Titulos';
import { CartContext } from '../../contexts/CartContext';


export default function loginClient() {

    const { cartProducts } = useContext(CartContext);
    const { signIn, signInPay } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userValid, setUserValid] = useState(false);
    const captcha = useRef(null);


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

        if (cartProducts?.length >= 1) {
            let data = {
                email,
                password
            }
            /* @ts-ignore */
            await signInPay(data);

            setLoading(false);

            return;
        }

        let data = {
            email,
            password
        }
        /* @ts-ignore */
        await signIn(data);

        setLoading(false);

    }

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('Usuario não é um robo!');
        }
    }

    return (
        <>
            <Head>
                <title>Loja Builder Seu Negócio Online - Login</title>
            </Head>

            <HeaderAccount />

            <ContainerCenter>

                <ContLogin>
                    <Titulos
                        tipo="h1"
                        titulo="Entrar para continuar"
                    />
                    <Formulario onSubmit={handleLogin}>
                        <TextInfo>Se você já possui cadastro na loja, informe seu e-mail e senha para continuar.</TextInfo>
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

                    <Titulos
                        tipo="h4"
                        titulo="Cadastre-se antes para poder finalizar seu pedido"
                    />

                    <br />

                    <ButtonCreateAccount>
                        <LinkCreateAccount
                            href="/createAccount"
                        >
                            Cadastre-se aqui!
                        </LinkCreateAccount>
                    </ButtonCreateAccount>

                    <Link href="/">
                        <TextLink>Ir para loja</TextLink>
                    </Link>

                </ContLogin>
            </ContainerCenter>

            <FooterAccount />
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})