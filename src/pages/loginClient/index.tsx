import { useContext, useState, useRef, FormEvent } from 'react';
import logoLoginImg from '../../assets/LogoBuilderBlack.png';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    ContLogin,
    ContainerCenter,
    Recaptcha,
    Formulario,
    TextLink,
} from './styles';
import { Input } from '../../components/ui/Input';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { canSSRGuest } from '../../utils/canSSRGuest';


export default function loginClient() {

    const { signIn } = useContext(AuthContext)

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

        setLoading(true)

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

            <ContainerCenter>

                <Image src={logoLoginImg} width={440} height={150} alt="Logo Builder Seu Negocio Online" />

                <ContLogin>
                    <Formulario onSubmit={handleLogin}>
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

                    <Link href="/createAccount">
                        <TextLink>Não possui uma conta? Cadastre-se</TextLink>
                    </Link>

                    <Link href="/recoveryPassword">
                        <TextLink>Esqueceu sua senha?</TextLink>
                    </Link>

                    <Link href="/">
                        <TextLink>Ir para loja</TextLink>
                    </Link>

                </ContLogin>
            </ContainerCenter>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
});