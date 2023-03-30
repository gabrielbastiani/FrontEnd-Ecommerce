import Head from "next/head";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { HeaderAccount } from "../../../components/HeaderAccount";
import { Grid } from "../../../components/dateClientUx/Estrutura/styles";
import MainHeader from "../../../components/dateClientUx/MainHeader";
import Aside from "../../../components/dateClientUx/Aside";
import { Container } from "../../../components/dateClientUx/ContainerContent/styles";
import { Card } from "../../../components/dateClientUx/CardContent/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import GridDate from "../../../components/dateClientUx/GridDates";
import { SectionDate } from "../../../components/dateClientUx/SectionDates/styles";
import { BlockTop } from "../../../components/dateClientUx/BlockTops/styles";
import { BlockDados } from "../../../components/dateClientUx/BlocksDado/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { InputCheck, TextNews } from "./styles";
import moment from 'moment';
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import Titulos from "../../../components/Titulos";


export default function Meusdados() {

    const { user } = useContext(AuthContext);
    let user_id = user?.id;

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [inscricaoEstaduals, setInscricaoEstaduals] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelected, setEstadoSelected] = useState();
    const [ceps, setCeps] = useState('');

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

    const [newslatters, setNewslatters] = useState("Nao");
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
        updateNews();
    };


    function isEmail(emails: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails)
    }


    async function refreshUser() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get(`/listExactUser?user_id=${user_id}`);

        setNameCompletes(response?.data?.nameComplete);
        setCpfs(response?.data?.cpf);
        setCnpjs(response?.data?.cnpj)
        setInscricaoEstaduals(response?.data?.inscricaoEstadual);
        setPhones(response?.data?.phone);
        setEmails(response?.data?.email);
        setDataNascimentos(response?.data?.dataNascimento);
        setLocals(response?.data?.local);
        setNumeros(response?.data?.numero);
        setBairros(response?.data?.bairro);
        setCidades(response?.data?.cidade);
        setEstados(response?.data?.estado);
        setCeps(response?.data?.CEP);
        setGeneros(response?.data?.genero);
        setNewslatters(response?.data?.newslatter);

    }

    useEffect(() => {
        async function loadUser() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactUser?user_id=${user_id}`);
                const {
                    nameComplete,
                    email,
                    cpf,
                    cnpj,
                    inscricaoEstadual,
                    phone,
                    dataNascimento,
                    genero,
                    newslatter,
                    local,
                    numero,
                    bairro,
                    CEP,
                    cidade,
                    estado
                } = response.data;

                setNameCompletes(nameComplete);
                setCnpjs(cnpj);
                setCpfs(cpf);
                setInscricaoEstaduals(inscricaoEstadual);
                setPhones(phone);
                setEmails(email);
                setDataNascimentos(dataNascimento);
                setLocals(local);
                setNumeros(numero);
                setBairros(bairro);
                setCidades(cidade);
                setEstados(estado);
                setCeps(CEP);
                setGeneros(genero);
                setNewslatters(newslatter);

            } catch (error) {
                console.log(error);
            }
        }
        loadUser();
    }, []);

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/nameUserUpdate?user_id=${user_id}`, { nameComplete: nameCompletes });
                toast.success('Nome atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateCpf() {
        try {
            const apiClient = setupAPIClient();
            if (cpfs === '') {
                toast.error('Não deixe o CPF em branco!!!');
                return;
            } else {
                await apiClient.put(`/cpfUserUpdate?user_id=${user_id}`, { cpf: cpfs });
                toast.success('CPF atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CPF.');
        }
    }

    async function updateCnpj() {
        try {
            const apiClient = setupAPIClient();
            if (cnpjs === '') {
                toast.error('Não deixe o CNPJ em branco!!!');
                return;
            } else {
                await apiClient.put(`/cnpjUserUpdate?user_id=${user_id}`, { cnpj: cnpjs });
                toast.success('CNPJ atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CNPJ.');
        }
    }

    async function updatePhone() {
        try {
            const apiClient = setupAPIClient();
            if (phones === '') {
                toast.error('Não deixe o telefone em branco!!!');
                return;
            } else {
                await apiClient.put(`/phoneUserUpdate?user_id=${user_id}`, { phone: phones });
                toast.success('Telefone atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o telefone.');
        }
    }

    async function updateInscricaoEstadual() {
        try {
            const apiClient = setupAPIClient();
            if (inscricaoEstaduals === '') {
                toast.error('Não deixe a inscrição estadual em branco, caro seja isento, escreva a palavra ISENTO nesse campo!!!');
                return;
            } else {
                await apiClient.put(`/inscricaoEstadualUserUpdate?user_id=${user_id}`, { inscricaoEstadual: inscricaoEstaduals });
                toast.success('Inscrição estadual atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a inscrição estadual.');
        }
    }

    async function updateEmail() {
        try {
            const apiClient = setupAPIClient();
            if (!isEmail(emails)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            if (emails === '') {
                toast.error('Não deixe o email em branco!!!');
                return;
            } else {
                await apiClient.put(`/emailUserUpdate?user_id=${user_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    async function updateDataNascimento() {
        try {
            const apiClient = setupAPIClient();
            if (dataNascimentos === '') {
                toast.error('Não deixe a data de nascimento em branco!!!');
                return;
            } else {
                await apiClient.put(`/dataDeNascimentoUserUpdate?user_id=${user_id}`, { dataNascimento: dataNascimentos });
                toast.success('Data de nascimento atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a data de nascimento.');
        }
    }

    async function updateNews() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/newslatterUserUpdate?user_id=${user_id}`, { newslatter: newslatters });

            refreshUser();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o preferencia pela newslatters.');
        }
        if (newslatters === "Nao") {
            toast.success(`A preferencia da Newslatters foi ativada.`);
            return;
        }

        if (newslatters === "Sim") {
            toast.error(`A preferencia da Newslatters foi desativada.`);
            return;
        }
    }

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value)
    }

    async function updateGenero() {
        try {
            if (generoSelected === "") {
                toast.error(`Selecione o genero, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/generoUserUpdate?user_id=${user_id}`, { genero: generoSelected });
            toast.success('Genero atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o genero.');
        }
    }

    async function updateEndereco() {
        try {
            const apiClient = setupAPIClient();
            if (locals === '') {
                toast.error('Não deixe o endereço em branco!!!');
                return;
            } else {
                await apiClient.put(`/ruaUserUpdate?user_id=${user_id}`, { local: locals });
                toast.success('Endereço atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o endereço.');
        }
    }

    async function updateNumero() {
        try {
            const apiClient = setupAPIClient();
            if (numeros === '') {
                toast.error('Não deixe o número em branco!!!');
                return;
            } else {
                await apiClient.put(`/numeroUserUpdate?user_id=${user_id}`, { numero: numeros });
                toast.success('Número atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o número.');
        }
    }

    async function updateBairro() {
        try {
            const apiClient = setupAPIClient();
            if (bairros === '') {
                toast.error('Não deixe o bairro em branco!!!');
                return;
            } else {
                await apiClient.put(`/bairroUserUpdate?user_id=${user_id}`, { bairro: bairros });
                toast.success('Bairro atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o bairro.');
        }
    }

    async function updateCidade() {
        try {
            const apiClient = setupAPIClient();
            if (cidades === '') {
                toast.error('Não deixe a cidade em branco!!!');
                return;
            } else {
                await apiClient.put(`/cityUserUpdate?user_id=${user_id}`, { cidade: cidades });
                toast.success('Cidade atualizada com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a cidade.');
        }
    }

    function handleChangeEstado(e: any) {
        setEstadoSelected(e.target.value)
    }

    async function updateEstado() {
        try {
            if (estadoSelected === "") {
                toast.error(`Selecione o estado, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/estadoUserUpdate?user_id=${user_id}`, { estado: estadoSelected });
            toast.success('Estado atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estado.');
        }
    }

    async function updateCep() {
        try {
            const apiClient = setupAPIClient();
            if (ceps === '') {
                toast.error('Não deixe o CEP em branco!!!');
                return;
            } else {
                await apiClient.put(`/cepUserUpdate?user_id=${user_id}`, { CEP: ceps });
                toast.success('CEP atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CEP.');
        }
    }


    return (
        <>
            <Head>
                <title>Meus Dados</title>
            </Head>

            <HeaderAccount />

            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Meus Dados"
                            />
                        </BlockTop>
                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={nameCompletes}
                                                type="text"
                                                placeholder={nameCompletes}
                                                value={nameCompletes}
                                                onChange={(e) => setNameCompletes(e.target.value)}
                                                handleSubmit={updateName}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    {cpfs ? (
                                        <TextoDados
                                            chave={"CPF"}
                                            dados={
                                                <InputUpdate
                                                    dado={cpfs}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    mask="000.000.000-00"
                                                    type="text"
                                                    placeholder={cpfs}
                                                    value={cpfs}
                                                    onChange={(e) => setCpfs(e.target.value)}
                                                    handleSubmit={updateCpf}
                                                />
                                            }
                                        />
                                    ) :
                                        null
                                    }

                                    {cnpjs ? (
                                        <TextoDados
                                            chave={"CNPJ"}
                                            dados={
                                                <InputUpdate
                                                    dado={cnpjs}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    mask="00.000.000/0000-00"
                                                    type="text"
                                                    placeholder={cnpjs}
                                                    value={cnpjs}
                                                    onChange={(e) => setCnpjs(e.target.value)}
                                                    handleSubmit={updateCnpj}
                                                />
                                            }
                                        />
                                    ) :
                                        null
                                    }

                                </BlockDados>

                                {cnpjs ? (
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Inscrição estadual"}
                                            dados={
                                                <InputUpdate
                                                    dado={inscricaoEstaduals}
                                                    type="text"
                                                    placeholder={inscricaoEstaduals}
                                                    value={inscricaoEstaduals}
                                                    onChange={(e) => setInscricaoEstaduals(e.target.value)}
                                                    handleSubmit={updateInscricaoEstadual}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                ) : null}

                                <BlockDados>
                                    <TextoDados
                                        chave={"Telefone"}
                                        dados={
                                            <InputUpdate
                                                dado={phones}
                                                type="text"
                                                /* @ts-ignore */
                                                as={IMaskInput}
                                                mask="(00) 0000-0000"
                                                placeholder={phones}
                                                value={phones}
                                                onChange={(e) => setPhones(e.target.value)}
                                                handleSubmit={updatePhone}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"E-mail"}
                                        dados={
                                            <InputUpdate
                                                dado={emails}
                                                type="text"
                                                placeholder={emails}
                                                value={emails}
                                                onChange={(e) => setEmails(e.target.value)}
                                                handleSubmit={updateEmail}
                                            />
                                        }
                                    />
                                </BlockDados>

                                {cnpjs ? (
                                    null
                                ) :
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Data de nascimento"}
                                            dados={
                                                <InputUpdate
                                                    dado={dataNascimentos}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    mask="00/00/0000"
                                                    placeholder={dataNascimentos}
                                                    value={dataNascimentos}
                                                    onChange={(e) => setDataNascimentos(e.target.value)}
                                                    handleSubmit={updateDataNascimento}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }

                                <BlockDados>
                                    <TextoDados
                                        chave={"Newslatters?"}
                                        dados={
                                            <InputCheck
                                                type="checkbox"
                                                value={newslatters}
                                                onClick={handleChecked}
                                                onChange={(e) => setNewslatters(check ? "Nao" : "Sim")}
                                                checked={check}
                                            />
                                        }
                                    />
                                    &ensp;<TextNews>{newslatters}</TextNews>
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                {cnpjs ? (
                                    null
                                ) :
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Gênero"}
                                            dados={
                                                <SelectUpdate
                                                    dado={generos}
                                                    value={generoSelected}
                                                    /* @ts-ignore */
                                                    onChange={handleChangeGenero}
                                                    opcoes={
                                                        [
                                                            { label: "Selecionar...", value: "" },
                                                            { label: "Masculino", value: "Masculino" },
                                                            { label: "Feminino", value: "Feminino" },
                                                            { label: "Outro", value: "Outro" },
                                                        ]
                                                    }
                                                    handleSubmit={updateGenero}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }

                                <BlockDados>
                                    <TextoDados
                                        chave={"Endereço"}
                                        dados={
                                            <InputUpdate
                                                dado={locals}
                                                type="text"
                                                placeholder={locals}
                                                value={locals}
                                                onChange={(e) => setLocals(e.target.value)}
                                                handleSubmit={updateEndereco}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Número"}
                                        dados={
                                            <InputUpdate
                                                dado={numeros}
                                                type="text"
                                                placeholder={numeros}
                                                value={numeros}
                                                onChange={(e) => setNumeros(e.target.value)}
                                                handleSubmit={updateNumero}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Bairro"}
                                        dados={
                                            <InputUpdate
                                                dado={bairros}
                                                type="text"
                                                placeholder={bairros}
                                                value={bairros}
                                                onChange={(e) => setBairros(e.target.value)}
                                                handleSubmit={updateBairro}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Cidade"}
                                        dados={
                                            <InputUpdate
                                                dado={cidades}
                                                type="text"
                                                placeholder={cidades}
                                                value={cidades}
                                                onChange={(e) => setCidades(e.target.value)}
                                                handleSubmit={updateCidade}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Estado"}
                                        dados={
                                            <SelectUpdate
                                                dado={estados}
                                                value={estadoSelected}
                                                /* @ts-ignore */
                                                onChange={handleChangeEstado}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },
                                                        { label: "Acre", value: "Acre" },
                                                        { label: "Alagoas", value: "Alagoas" },
                                                        { label: "Amapá", value: "Amapá" },
                                                        { label: "Amazonas", value: "Amazonas" },
                                                        { label: "Bahia", value: "Bahia" },
                                                        { label: "Ceara", value: "Ceara" },
                                                        { label: "Distrito Federal", value: "Distrito Federal" },
                                                        { label: "Espírito Santo", value: "Espírito Santo" },
                                                        { label: "Goiás", value: "Goiás" },
                                                        { label: "Maranhão", value: "Maranhão" },
                                                        { label: "Mato Grosso", value: "Mato Grosso" },
                                                        { label: "Mato Grosso do Sul", value: "Mato Grosso do Sul" },
                                                        { label: "Minas Gerais", value: "Minas Gerais" },
                                                        { label: "Pará", value: "Pará" },
                                                        { label: "Paraíba", value: "Paraíba" },
                                                        { label: "Paraná", value: "Paraná" },
                                                        { label: "Pernambuco", value: "Pernambuco" },
                                                        { label: "Piauí", value: "Piauí" },
                                                        { label: "Rio de Janeiro", value: "Rio de Janeiro" },
                                                        { label: "Rio Grande do Norte", value: "Rio Grande do Norte" },
                                                        { label: "Rio Grande do Sul", value: "Rio Grande do Sul" },
                                                        { label: "Rondônia", value: "Rondônia" },
                                                        { label: "Roraima", value: "Roraima" },
                                                        { label: "Santa Catarina", value: "Santa Catarina" },
                                                        { label: "São Paulo", value: "São Paulo" },
                                                        { label: "Sergipe", value: "Sergipe" },
                                                        { label: "Tocantins", value: "Tocantins" }
                                                    ]
                                                }
                                                handleSubmit={updateEstado}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"CEP"}
                                        dados={
                                            <InputUpdate
                                                dado={ceps}
                                                type="text"
                                                /* @ts-ignore */
                                                as={IMaskInput}
                                                mask="00000-000"
                                                placeholder={ceps}
                                                value={ceps}
                                                onChange={(e) => setCeps(e.target.value)}
                                                handleSubmit={updateCep}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>
                        </GridDate>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});