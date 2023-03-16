import React from "react";
import {
    ContainerCenter,
    BoxTop,
    ContLogin,
    TextCadastro,
    RadioBotton,
    FormularioCadastro,
    Etiqueta,
    BoxRadios
} from './styles';
import Head from "next/head";
import { HeaderAccount } from "../../components/HeaderAccount";
import Titulos from "../../components/Titulos";


export default function createAccount() {

    return (
        <>
            <Head>
                <title>Cadastro na Loja</title>
            </Head>

            <HeaderAccount />

            <ContainerCenter>
                <ContLogin>
                    <BoxTop>
                        <Titulos
                            tipo="h1"
                            titulo="Cadastro"
                        />

                        <TextCadastro>Por favor, preencha os campos abaixo para criar sua conta na loja</TextCadastro>

                        <BoxRadios>
                            <Etiqueta>Pessoa Juridica</Etiqueta>
                            <RadioBotton type="radio" id="css" name="fav_language" value="CSS" />

                            <Etiqueta>Pessoa Fisica</Etiqueta>
                            <RadioBotton type="radio" id="html" name="fav_language" value="HTML" />
                        </BoxRadios>

                        <Titulos
                            tipo="h2"
                            titulo="Dados Pessoais"
                        />

                        <FormularioCadastro>

                        </FormularioCadastro>

                    </BoxTop>
                </ContLogin>
            </ContainerCenter>
        </>
    )
}