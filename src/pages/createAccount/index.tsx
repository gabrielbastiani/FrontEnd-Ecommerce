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
    SelectGenero,
    DataAddress
} from './styles';
import Head from "next/head";
import { HeaderAccount } from "../../components/HeaderAccount";
import Titulos from "../../components/Titulos";
import { Input } from "../../components/ui/Input";
import { IMaskInput } from "react-imask";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";


type CepProps = {
    bairro: string;
    cep: string;
    complemento: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

export default function createAccount() {

    const { cartProducts } = useContext(CartContext);
    const { signIn } = useContext(AuthContext);

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

    const [numeros, setNumeros] = useState('');
    const [referencias, setReferencias] = useState('');
    const [complement, setComplement] = useState('');

    const [currentRadioValue, setCurrentValue] = useState('off');

    const [cepBusca, setCepBusca] = useState("");
    const [searchAddress, setSearchAddress] = useState<CepProps>();

    const [cepLoad, setCepLoad] = useState(false);
    const [cepLoadCnpjs, setCepLoadCnpjs] = useState(false);

    const handleCep = () => {
        setCepLoad(!cepLoad);
    }

    const handleCepCnpjs = () => {
        setCepLoadCnpjs(!cepLoadCnpjs);
    }

    async function loadCep() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setSearchAddress(response?.data);
            handleCep();
        } catch (error) {
            console.log(error)
        }
    }

    async function loadCepCnpjs() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post(`/findAddressCep`, {
                cep: cepBusca
            });
            setSearchAddress(response?.data);
            handleCepCnpjs();
        } catch (error) {
            console.log(error)
        }
    }

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
                generoSelected === ''
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
                address: searchAddress?.logradouro,
                number: numeros,
                complement: complement,
                reference: referencias,
                neighborhood: searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro",
                cep: searchAddress?.cep,
                city: searchAddress?.localidade,
                state: searchAddress?.uf,
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
            setNumeros('');
            setReferencias('');
            setCpfs('');

            let data = {
                email,
                password,
                cartProducts
            }

            await signIn(data);

            return;

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
                inscricao === ''
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
                address: searchAddress?.logradouro,
                number: numeros,
                complement: complement,
                reference: referencias,
                neighborhood: searchAddress?.bairro,
                cep: searchAddress?.cep,
                city: searchAddress?.localidade,
                state: searchAddress?.uf,
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
            setNumeros('');
            setReferencias('');
            setCnpjs('');

            let data = {
                email,
                password,
                cartProducts
            }

            await signIn(data);

            return;

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
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <Titulos tipo="h1" titulo="Endereço de entrega" />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    {cepLoad ?
                                        <>
                                            <BlockInputs>
                                                <Button
                                                    style={{ backgroundColor: 'red', width: '50%' }}
                                                    onClick={handleCep}
                                                >
                                                    Limpar endereço
                                                </Button>
                                            </BlockInputs>
                                            <br />
                                            <br />
                                            <BlockInputs>
                                                <EtiquetaInput>Endereço</EtiquetaInput>
                                                <DataAddress>{searchAddress?.logradouro}</DataAddress>
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
                                                <EtiquetaInput>Complemento</EtiquetaInput>
                                                <Input
                                                    type="text"
                                                    placeholder="Complemento"
                                                    value={complement}
                                                    onChange={(e) => setComplement(e.target.value)}
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
                                                <DataAddress>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>Cidade</EtiquetaInput>
                                                <DataAddress>{searchAddress?.localidade}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>Estado</EtiquetaInput>
                                                <DataAddress>{searchAddress?.uf}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>CEP</EtiquetaInput>
                                                <DataAddress>{searchAddress?.cep}</DataAddress>
                                            </BlockInputs>
                                        </>
                                        :
                                        <>
                                            <BlockInputs>
                                                <EtiquetaInput>CEP</EtiquetaInput>
                                                <Input
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00000-000"
                                                    type="text"
                                                    placeholder="CEP"
                                                    onChange={(e) => setCepBusca(e.target.value)}
                                                />
                                            </BlockInputs>

                                            <Button
                                                style={{ backgroundColor: 'green', width: '50%' }}
                                                onClick={loadCep}
                                            >
                                                Buscar endereço
                                            </Button>
                                        </>
                                    }
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
                                        <br />
                                        <br />
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
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <Titulos tipo="h1" titulo="Endereço de entrega" />
                                    </BlockInputs>

                                    <BlockInputs>
                                        <br />
                                        <br />
                                    </BlockInputs>

                                    {cepLoadCnpjs ?
                                        <>
                                            <BlockInputs>
                                                <Button
                                                    style={{ backgroundColor: 'red', width: '50%' }}
                                                    onClick={handleCepCnpjs}
                                                >
                                                    Limpar endereço
                                                </Button>
                                            </BlockInputs>
                                            <br />
                                            <br />
                                            <BlockInputs>
                                                <EtiquetaInput>Endereço</EtiquetaInput>
                                                <DataAddress>{searchAddress?.logradouro}</DataAddress>
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
                                                <EtiquetaInput>Complemento</EtiquetaInput>
                                                <Input
                                                    type="text"
                                                    placeholder="Complemento"
                                                    value={complement}
                                                    onChange={(e) => setComplement(e.target.value)}
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
                                                <DataAddress>{searchAddress?.bairro ? searchAddress?.bairro : "Sem bairro"}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>Cidade</EtiquetaInput>
                                                <DataAddress>{searchAddress?.localidade}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>Estado</EtiquetaInput>
                                                <DataAddress>{searchAddress?.uf}</DataAddress>
                                            </BlockInputs>

                                            <BlockInputs>
                                                <EtiquetaInput>CEP</EtiquetaInput>
                                                <DataAddress>{searchAddress?.cep}</DataAddress>
                                            </BlockInputs>
                                        </>
                                        :
                                        <>
                                            <BlockInputs>
                                                <EtiquetaInput>CEP</EtiquetaInput>
                                                <Input
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00000-000"
                                                    type="text"
                                                    placeholder="CEP"
                                                    onChange={(e) => setCepBusca(e.target.value)}
                                                />
                                            </BlockInputs>

                                            <Button
                                                style={{ backgroundColor: 'green', width: '50%' }}
                                                onClick={loadCepCnpjs}
                                            >
                                                Buscar endereço
                                            </Button>
                                        </>
                                    }

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