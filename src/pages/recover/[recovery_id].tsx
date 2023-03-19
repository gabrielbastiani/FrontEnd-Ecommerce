import { FormEvent, useState } from 'react';
import logoLoginImg from '../../assets/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { ContLogin, ContainerCenter, Formulario, TextLink } from '../loginClient/styles';
import Link from 'next/link';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';


export default function Recover() {

    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    let recovery_id = router.query.recovery_id;

    async function handleRecovery(event: FormEvent) {
        event.preventDefault();
        try {
            if (newPassword != password) {
                toast.error('Senhas diferentes');

                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.put(`/recover?recovery_id=${recovery_id}`, { password })

            toast.success('Senha atualizada com sucesso.');

            Router.push('/loginClient');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao atualizar a sua senha');
        }

    }


    return (
        <ContainerCenter>

            <Image src={logoLoginImg} width={440} height={150} alt="Logo Builder Seu Negocio Online" />

            <ContLogin>
                <Formulario onSubmit={handleRecovery}>

                    <Input
                        placeholder='Digite nova senha'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Input
                        placeholder='Repetir a nova senha'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        Alterar senha
                    </Button>

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