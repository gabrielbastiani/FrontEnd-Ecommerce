import React, { useContext, useState } from 'react';
import {
    MdExitToApp,
    MdClose,
    MdMenu,
    MdOutlineCategory,
} from 'react-icons/md';
import {
    AiOutlineShoppingCart,
    AiOutlineCloudDownload
} from 'react-icons/ai';
import {
    FaRegMoneyBillAlt
} from 'react-icons/fa';
import {
    FiKey
} from 'react-icons/fi';
import { AuthContext } from '../../../contexts/AuthContext';
import {
    Container,
    Header,
    Title,
    MenuContainer,
    MenuItemButton,
    ToggleMenu,
} from './styles';
import Link from 'next/link';


export const Aside = () => {

    const { signOut } = useContext(AuthContext);

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }


    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>

                <Title>Minha Conta</Title>

            </Header>

            <MenuContainer>
                <Link href="/myAccount/meuspedidos">
                    <AiOutlineShoppingCart />
                    Meus Pedidos
                </Link>

                <Link href="/myAccount/meuscreditos">
                    <FaRegMoneyBillAlt />
                    Meus Créditos
                </Link>

                <Link href="/myAccount/meusprodutosdigitais">
                    <AiOutlineCloudDownload />
                    Meus Produtos Digitais
                </Link>

                <Link href="/myAccount/meusdados">
                    <MdOutlineCategory />
                    Meus Dados
                </Link>

                <Link href="/recoveryPassword">
                    <FiKey />
                    Alterar Senha
                </Link>

                <MenuItemButton onClick={signOut} >
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    );
}

export default Aside;