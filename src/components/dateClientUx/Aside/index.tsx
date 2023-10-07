import React, { useContext, useEffect, useState } from 'react';
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
import { setupAPIClient } from '../../../services/api';


export const Aside = () => {

    const { signOut } = useContext(AuthContext);

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display1 = datasConfigs[0]?.credits_customer_in_menu === "Disponivel" ? "block" : "none";
    const display2 = datasConfigs[0]?.digital_products_customer_in_menu === "Disponivel" ? "block" : "none";


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

                <Link href="/myAccount/meuscreditos"
                    style={{ display: display1 }}
                >
                    <FaRegMoneyBillAlt />
                    Meus Créditos
                </Link>

                <Link href="/myAccount/meusprodutosdigitais"
                    style={{ display: display2 }}
                >
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

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    );
}

export default Aside;