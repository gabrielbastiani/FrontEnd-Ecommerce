import React from "react";
import {
    ContainerCenter,
    BoxTop,
    ContLogin,
    TextCadastro,
    RadioBotton,
    CadastroPessoaFisica,
    Etiqueta,
    BoxRadios,
    EtiquetaInput,
    BlockInputs,
    BoxNews,
    ButtonBox,
    OpcoesGenero,
    SelectGenero
} from './styles';
import Head from "next/head";
import { HeaderAccount } from "../../components/HeaderAccount";
import Titulos from "../../components/Titulos";
import { Input } from "../../components/ui/Input";
import { IMaskInput } from "react-imask";
import { Button } from "../../components/ui/Button";

function isEmail(email: string) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
}


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

                        <CadastroPessoaFisica>

                            <BlockInputs>
                                <EtiquetaInput>Nome Completo</EtiquetaInput>
                                <Input
                                    placeholder="Nome Completo"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>E-mail</EtiquetaInput>
                                <Input
                                    name='email'
                                    value={''}
                                    placeholder="E-mail"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>CPF</EtiquetaInput>
                                <Input
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="000.000.000-00"
                                    type="text"
                                    placeholder="CPF"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Data de Nascimento</EtiquetaInput>
                                <Input
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="00/00/0000"
                                    type="text"
                                    placeholder="dd/mm/aaaa"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Gênero</EtiquetaInput>
                                <SelectGenero name="genero">
                                    <OpcoesGenero value="">Selecione...</OpcoesGenero>
                                    <OpcoesGenero value="Masculino">Masculino</OpcoesGenero>
                                    <OpcoesGenero value="Feminino">Feminino</OpcoesGenero>
                                    <OpcoesGenero value="Outros">Outros</OpcoesGenero>
                                </SelectGenero>
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Telefone</EtiquetaInput>
                                <Input
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="(00) 0000-0000"
                                    type="text"
                                    placeholder="(00) 0000-0000"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Senha</EtiquetaInput>
                                <Input
                                    type="password"
                                    placeholder="Senha"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Repitir a senha</EtiquetaInput>
                                <Input
                                    type="password"
                                    placeholder="Repitir a senha"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <BoxNews>
                                    <EtiquetaInput>Receba nossas ofertas</EtiquetaInput>
                                    <RadioBotton type="checkbox" id="css" name="fav_language" value="CSS" />
                                </BoxNews>
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Endereço</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Endereço"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Número</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Número"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Referência</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Referência"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Bairro</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Bairro"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>CEP</EtiquetaInput>
                                <Input
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="00000-000"
                                    type="text"
                                    placeholder="CEP"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Cidade</EtiquetaInput>
                                <Input
                                    type="text"
                                    placeholder="Cidade"
                                />
                            </BlockInputs>

                            <BlockInputs>
                                <EtiquetaInput>Estado</EtiquetaInput>
                                <SelectGenero name="estado">
                                    <OpcoesGenero value="">Selecione...</OpcoesGenero>
                                    <OpcoesGenero value="Acre">Acre</OpcoesGenero>
                                    {label: "Alagoas", value: "Alagoas" },
                                    {label: "Amapá", value: "Amapá" },
                                    {label: "Amazonas", value: "Amazonas" },
                                    {label: "Bahia", value: "Bahia" },
                                    {label: "Ceara", value: "Ceara" },
                                    {label: "Distrito Federal", value: "Distrito Federal" },
                                    {label: "Espírito Santo", value: "Espírito Santo" },
                                    {label: "Goiás", value: "Goiás" },
                                    {label: "Maranhão", value: "Maranhão" },
                                    {label: "Mato Grosso", value: "Mato Grosso" },
                                    {label: "Mato Grosso do Sul", value: "Mato Grosso do Sul" },
                                    {label: "Minas Gerais", value: "Minas Gerais" },
                                    {label: "Pará", value: "Pará" },
                                    {label: "Paraíba", value: "Paraíba" },
                                    {label: "Paraná", value: "Paraná" },
                                    {label: "Pernambuco", value: "Pernambuco" },
                                    {label: "Piauí", value: "Piauí" },
                                    {label: "Rio de Janeiro", value: "Rio de Janeiro" },
                                    {label: "Rio Grande do Norte", value: "Rio Grande do Norte" },
                                    {label: "Rio Grande do Sul", value: "Rio Grande do Sul" },
                                    {label: "Rondônia", value: "Rondônia" },
                                    {label: "Roraima", value: "Roraima" },
                                    {label: "Santa Catarina", value: "Santa Catarina" },
                                    {label: "São Paulo", value: "São Paulo" },
                                    {label: "Sergipe", value: "Sergipe" },
                                    {label: "Tocantins", value: "Tocantins" }
                                </SelectGenero>
                            </BlockInputs>

                        </CadastroPessoaFisica>

                        <ButtonBox>
                            <Button
                                style={{ width: '95%' }}
                                type="submit"
                            >
                                Cadastrar
                            </Button>
                        </ButtonBox>

                    </BoxTop>
                </ContLogin>
            </ContainerCenter>
        </>
    )
}