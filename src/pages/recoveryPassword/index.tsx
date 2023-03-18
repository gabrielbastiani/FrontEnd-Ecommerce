import { FormEvent, useState, useRef } from 'react'
import logoLoginImg from '../../assets/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { setupAPIClient } from '../../services/api';
import Router from 'next/router';
import Image from 'next/image';
import { ContLogin, ContainerCenter, Formulario, Recaptcha, TextLink } from '../loginClient/styles';
import Link from 'next/link';


export default function recoveryPassword() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [userValid, setUserValid] = useState(false);
    const captcha = useRef(null);


    async function handleRecovery(event: FormEvent) {
        event.preventDefault();
        try {
            if (captcha.current.getValue()) {
                console.log('Usuario válido!')
                setUserValid(true)
            } else {
                console.log('Por favor, acerte o recaptcha!')
                toast.error('Por favor, acerte o recaptcha!')

                return;
            }

            if (email === '') {
                toast.warning('Digite seu e-mail!')
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/recover', {
                email: email
            });

            toast.success('Verifique sua caixa de e-mail');
            toast.warning('NÃO DEIXE DE VERIFICAR O SPAN OU LIXEIRA!!!');

            setLoading(false);

            Router.push('/loginClient');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao enviar e-mail!');
        }

    }

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('Usuario não é um robo!')
        }
    }



    return (
        <ContainerCenter>

            <Image src={logoLoginImg} width={440} height={150} alt="Logo Builder Seu Negocio Online" />

            <ContLogin>
                <Formulario onSubmit={handleRecovery}>
                    <Input
                        placeholder='Digite seu email cadastrado'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Recaptcha>
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                            onChange={onChange}
                        />
                    </Recaptcha>

                    {!userValid &&
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Enviar solicitação
                        </Button>
                    }
                </Formulario>

                <Link href="/createAccount">
                    <TextLink>Não possui uma conta? Cadastre-se</TextLink>
                </Link>

                <Link href="/loginClient">
                    <TextLink>Já possui uma conta? Faça login!</TextLink>
                </Link>

                <Link href="https://lojavirtual.builderseunegocioonline.com.br">
                    <TextLink>Ir para o Loja Virtual</TextLink>
                </Link>

            </ContLogin>
        </ContainerCenter>
    )
}