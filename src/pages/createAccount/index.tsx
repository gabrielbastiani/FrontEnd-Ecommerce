import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import Router from "next/router";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";


export default function createAccount() {

    const { cartProducts } = useContext(CartContext);
    const { signInPay } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [lojas_id, setLojas_id] = useState('');
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [inscricao, setInscricao] = useState('');

    const [check, setCheck] = useState(false);
    const [news, setNews] = useState('Nao');

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    const [phones, setPhones] = useState('');
    const [nascimento, setNascimento] = useState('');

    const [generoSelected, setGeneroSelected] = useState();

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value);
    }

    const [enderecos, setEnderecos] = useState('');
    const [numeros, setNumeros] = useState('');
    const [referencias, setReferencias] = useState('');
    const [bairros, setBairros] = useState('');
    const [ceps, setCeps] = useState('');
    const [cidades, setCidades] = useState('');

    const [estadosSelected, setEstadosSelected] = useState();

    function handleChangeEstado(e: any) {
        setEstadosSelected(e.target.value);
    }

    const [currentRadioValue, setCurrentValue] = useState('off');

    function isEmail(email: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
    };

    useEffect(() => {
        async function loadLoja() {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get('/store');
            setLojas_id(data?.id);
        }
        loadLoja();
    }, []);

    async function handleRegisterClientCPF() {
        try {
            if (names === '' ||
                email === '' ||
                confirmPassword === '' ||
                cpfs === '' ||
                phones === '' ||
                nascimento === '' ||
                generoSelected === '' ||
                enderecos === '' ||
                bairros === '' ||
                ceps === '' ||
                cidades === '' ||
                estadosSelected === ''
            ) {
                toast.error('Preencha todos os campos');
                return
            }

            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            if (confirmPassword != password) {
                toast.error('Senhas diferentes');
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/customer/createCustomer', {
                name: names,
                email: email,
                password: confirmPassword,
                cpf: cpfs,
                phone: phones,
                dateOfBirth: nascimento,
                gender: generoSelected,
                address: enderecos,
                number: numeros,
                complement: referencias,
                neighborhood: bairros,
                cep: ceps,
                city: cidades,
                state: estadosSelected,
                newslatter: news,
                store_id: lojas_id
            });

            toast.success('Cadastrado realizado com sucesso!!!');

            setLoading(false);

            setNames('');
            setEmail('');
            setConfirmPassword('');
            setPhones('');
            setNascimento('');
            setEnderecos('');
            setNumeros('');
            setReferencias('');
            setBairros('');
            setCeps('');
            setCidades('');
            setCpfs('');

            if(cartProducts?.length >= 1) {
                let data = {
                    email,
                    password,
                    cartProducts
                }
                /* @ts-ignore */
                await signInPay(data);

                return;
            }

            Router.push('/');

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao cadastrar o cliente!');
        }
    }

    async function handleRegisterClientCNPJ() {
        try {
            if (names === '' ||
                email === '' ||
                confirmPassword === '' ||
                cnpjs === '' ||
                phones === '' ||
                inscricao === '' ||
                enderecos === '' ||
                bairros === '' ||
                ceps === '' ||
                cidades === '' ||
                estadosSelected === ''
            ) {
                toast.error('Preencha todos os campos.');
                return
            }

            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            if (confirmPassword != password) {
                toast.error('Senhas diferentes');
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/customer/createCustomer', {
                name: names,
                email: email,
                password: confirmPassword,
                cnpj: cnpjs,
                phone: phones,
                stateRegistration: inscricao,
                address: enderecos,
                number: numeros,
                complement: referencias,
                neighborhood: bairros,
                cep: ceps,
                city: cidades,
                state: estadosSelected,
                newslatter: news,
                store_id: lojas_id
            });

            toast.success('Cadastrado realizado com sucesso!!!');

            setLoading(false);

            setNames('');
            setEmail('');
            setConfirmPassword('');
            setPhones('');
            setInscricao('');
            setEnderecos('');
            setNumeros('');
            setReferencias('');
            setBairros('');
            setCnpjs('');
            setCidades('');
            setCeps('');

            if(cartProducts?.length >= 1) {
                let data = {
                    email,
                    password,
                    cartProducts
                }
                /* @ts-ignore */
                await signInPay(data);

                return;
            }

            Router.push('/');

        } catch (error) {
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar o cliente!')
        }
    }


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
                            <RadioBotton
                                name="radio-item-1"
                                value="on"
                                type="radio"
                                onChange={e => setCurrentValue(e.target.value)}
                                defaultChecked={currentRadioValue === 'on'}
                            />

                            <Etiqueta>Pessoa Fisica</Etiqueta>
                            <RadioBotton
                                name="radio-item-1"
                                value="off"
                                type="radio"
                                onChange={e => setCurrentValue(e.target.value)}
                                defaultChecked={currentRadioValue === 'off'}
                            />
                        </BoxRadios>

                        {currentRadioValue === 'off' &&
                            <>
                                <Titulos
                                    tipo="h2"
                                    titulo="Dados Pessoais"
                                />

                                <CadastroPessoaFisica>

                                    <BlockInputs>
                                        <EtiquetaInput>Nome Completo</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Nome Completo"
                                            value={names}
                                            onChange={(e) => setNames(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>E-mail</EtiquetaInput>
                                        <Input
                                            name='email'
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={cpfs}
                                            onChange={(e) => setCpfs(e.target.value)}
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
                                            value={nascimento}
                                            onChange={(e) => setNascimento(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Gênero</EtiquetaInput>
                                        <SelectGenero
                                            value={generoSelected}
                                            onChange={handleChangeGenero}
                                        >
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
                                            value={phones}
                                            onChange={(e) => setPhones(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Senha</EtiquetaInput>
                                        <Input
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Repitir a senha</EtiquetaInput>
                                        <Input
                                            type="password"
                                            placeholder="Repitir a senha"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <BoxNews>
                                            <EtiquetaInput>Receba nossas ofertas</EtiquetaInput>
                                            <RadioBotton
                                                type="checkbox"
                                                value={news}
                                                onClick={handleChecked}
                                                onChange={(e) => setNews(check ? "Nao" : "Sim")}
                                                checked={check}
                                            />
                                        </BoxNews>
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Endereço</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Endereço"
                                            value={enderecos}
                                            onChange={(e) => setEnderecos(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Número</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Número"
                                            value={numeros}
                                            onChange={(e) => setNumeros(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Referência</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Referência"
                                            value={referencias}
                                            onChange={(e) => setReferencias(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Bairro</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Bairro"
                                            value={bairros}
                                            onChange={(e) => setBairros(e.target.value)}
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
                                            value={ceps}
                                            onChange={(e) => setCeps(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Cidade</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Cidade"
                                            value={cidades}
                                            onChange={(e) => setCidades(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Estado</EtiquetaInput>
                                        <SelectGenero
                                            value={estadosSelected}
                                            onChange={handleChangeEstado}
                                        >
                                            <OpcoesGenero value="">Selecione...</OpcoesGenero>
                                            <OpcoesGenero value="Acre">Acre</OpcoesGenero>
                                            <OpcoesGenero value="Alagoas">Alagoas</OpcoesGenero>
                                            <OpcoesGenero value="Amapá">Amapá</OpcoesGenero>
                                            <OpcoesGenero value="Amazonas">Amazonas</OpcoesGenero>
                                            <OpcoesGenero value="Bahia">Bahia</OpcoesGenero>
                                            <OpcoesGenero value="Ceara">Ceara</OpcoesGenero>
                                            <OpcoesGenero value="Distrito Federal">Distrito Federal</OpcoesGenero>
                                            <OpcoesGenero value="Espírito Santo">Espírito Santo</OpcoesGenero>
                                            <OpcoesGenero value="Goiás">Goiás</OpcoesGenero>
                                            <OpcoesGenero value="Maranhão">Maranhão</OpcoesGenero>
                                            <OpcoesGenero value="Mato Grosso">Mato Grosso</OpcoesGenero>
                                            <OpcoesGenero value="Mato Grosso do Sul">Mato Grosso do Sul</OpcoesGenero>
                                            <OpcoesGenero value="Minas Gerais">Minas Gerais</OpcoesGenero>
                                            <OpcoesGenero value="Pará">Pará</OpcoesGenero>
                                            <OpcoesGenero value="Paraíba">Paraíba</OpcoesGenero>
                                            <OpcoesGenero value="Paraná">Paraná</OpcoesGenero>
                                            <OpcoesGenero value="Pernambuco">Pernambuco</OpcoesGenero>
                                            <OpcoesGenero value="Piauí">Piauí</OpcoesGenero>
                                            <OpcoesGenero value="Rio de Janeiro">Rio de Janeiro</OpcoesGenero>
                                            <OpcoesGenero value="Rio Grande do Norte">Rio Grande do Norte</OpcoesGenero>
                                            <OpcoesGenero value="Rio Grande do Sul">Rio Grande do Sul</OpcoesGenero>
                                            <OpcoesGenero value="Rondônia">Rondônia</OpcoesGenero>
                                            <OpcoesGenero value="Roraima">Roraima</OpcoesGenero>
                                            <OpcoesGenero value="Santa Catarina">Santa Catarina</OpcoesGenero>
                                            <OpcoesGenero value="São Paulo">São Paulo</OpcoesGenero>
                                            <OpcoesGenero value="Sergipe">Sergipe</OpcoesGenero>
                                            <OpcoesGenero value="Tocantins">Tocantins</OpcoesGenero>
                                        </SelectGenero>
                                    </BlockInputs>

                                </CadastroPessoaFisica>

                                <ButtonBox>
                                    <Button
                                        style={{ width: '95%' }}
                                        type="submit"
                                        loading={loading}
                                        onClick={handleRegisterClientCPF}
                                    >
                                        Cadastrar
                                    </Button>
                                </ButtonBox>
                            </>
                        }

                        {currentRadioValue === 'on' &&
                            <>
                                <Titulos
                                    tipo="h2"
                                    titulo="Dados da Empresa"
                                />

                                <CadastroPessoaFisica>

                                    <BlockInputs>
                                        <EtiquetaInput>Razão Social</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Razão Social"
                                            value={names}
                                            onChange={(e) => setNames(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>E-mail</EtiquetaInput>
                                        <Input
                                            name='email'
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>CNPJ</EtiquetaInput>
                                        <Input
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="00.000.000/0000-00"
                                            type="text"
                                            placeholder="CNPJ"
                                            value={cnpjs}
                                            onChange={(e) => setCnpjs(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Inscrição Estadual<br /> (Se for ISENTO, escreva ISENTO abaixo)</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Inscrição Estadual"
                                            value={inscricao}
                                            onChange={(e) => setInscricao(e.target.value)}
                                        />
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
                                            value={phones}
                                            onChange={(e) => setPhones(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Senha</EtiquetaInput>
                                        <Input
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Repitir a senha</EtiquetaInput>
                                        <Input
                                            type="password"
                                            placeholder="Repitir a senha"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <BoxNews>
                                            <EtiquetaInput>Receba nossas ofertas</EtiquetaInput>
                                            <RadioBotton
                                                type="checkbox"
                                                value={news}
                                                onClick={handleChecked}
                                                onChange={(e) => setNews(check ? "Nao" : "Sim")}
                                                checked={check}
                                            />
                                        </BoxNews>
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Endereço</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Endereço"
                                            value={enderecos}
                                            onChange={(e) => setEnderecos(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Número</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Número"
                                            value={numeros}
                                            onChange={(e) => setNumeros(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Referência</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Referência"
                                            value={referencias}
                                            onChange={(e) => setReferencias(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Bairro</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Bairro"
                                            value={bairros}
                                            onChange={(e) => setBairros(e.target.value)}
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
                                            value={ceps}
                                            onChange={(e) => setCeps(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Cidade</EtiquetaInput>
                                        <Input
                                            type="text"
                                            placeholder="Cidade"
                                            value={cidades}
                                            onChange={(e) => setCidades(e.target.value)}
                                        />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <EtiquetaInput>Estado</EtiquetaInput>
                                        <SelectGenero
                                            value={estadosSelected}
                                            onChange={handleChangeEstado}
                                        >
                                            <OpcoesGenero value="">Selecione...</OpcoesGenero>
                                            <OpcoesGenero value="Acre">Acre</OpcoesGenero>
                                            <OpcoesGenero value="Alagoas">Alagoas</OpcoesGenero>
                                            <OpcoesGenero value="Amapá">Amapá</OpcoesGenero>
                                            <OpcoesGenero value="Amazonas">Amazonas</OpcoesGenero>
                                            <OpcoesGenero value="Bahia">Bahia</OpcoesGenero>
                                            <OpcoesGenero value="Ceara">Ceara</OpcoesGenero>
                                            <OpcoesGenero value="Distrito Federal">Distrito Federal</OpcoesGenero>
                                            <OpcoesGenero value="Espírito Santo">Espírito Santo</OpcoesGenero>
                                            <OpcoesGenero value="Goiás">Goiás</OpcoesGenero>
                                            <OpcoesGenero value="Maranhão">Maranhão</OpcoesGenero>
                                            <OpcoesGenero value="Mato Grosso">Mato Grosso</OpcoesGenero>
                                            <OpcoesGenero value="Mato Grosso do Sul">Mato Grosso do Sul</OpcoesGenero>
                                            <OpcoesGenero value="Minas Gerais">Minas Gerais</OpcoesGenero>
                                            <OpcoesGenero value="Pará">Pará</OpcoesGenero>
                                            <OpcoesGenero value="Paraíba">Paraíba</OpcoesGenero>
                                            <OpcoesGenero value="Paraná">Paraná</OpcoesGenero>
                                            <OpcoesGenero value="Pernambuco">Pernambuco</OpcoesGenero>
                                            <OpcoesGenero value="Piauí">Piauí</OpcoesGenero>
                                            <OpcoesGenero value="Rio de Janeiro">Rio de Janeiro</OpcoesGenero>
                                            <OpcoesGenero value="Rio Grande do Norte">Rio Grande do Norte</OpcoesGenero>
                                            <OpcoesGenero value="Rio Grande do Sul">Rio Grande do Sul</OpcoesGenero>
                                            <OpcoesGenero value="Rondônia">Rondônia</OpcoesGenero>
                                            <OpcoesGenero value="Roraima">Roraima</OpcoesGenero>
                                            <OpcoesGenero value="Santa Catarina">Santa Catarina</OpcoesGenero>
                                            <OpcoesGenero value="São Paulo">São Paulo</OpcoesGenero>
                                            <OpcoesGenero value="Sergipe">Sergipe</OpcoesGenero>
                                            <OpcoesGenero value="Tocantins">Tocantins</OpcoesGenero>
                                        </SelectGenero>
                                    </BlockInputs>

                                </CadastroPessoaFisica>

                                <ButtonBox>
                                    <Button
                                        style={{ width: '95%' }}
                                        type="submit"
                                        loading={loading}
                                        onClick={handleRegisterClientCNPJ}
                                    >
                                        Cadastrar
                                    </Button>
                                </ButtonBox>
                            </>
                        }
                    </BoxTop>
                </ContLogin>
            </ContainerCenter>
        </>
    )
}