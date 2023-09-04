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
import { TextNews } from "./styles";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import Titulos from "../../../components/Titulos";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import Router from "next/router";


export default function Meusdados() {

    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [complements, setComplements] = useState('');
    const [references, setReferences] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelected, setEstadoSelected] = useState();
    const [ceps, setCeps] = useState('');
    const [newslatters, setNewslatters] = useState("");

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

    function isEmail(emails: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails)
    };

    async function refreshUser() {
        const apiClient = setupAPIClient();

        const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

        setNameCompletes(data?.name || "");
        setCpfs(data?.cpf || "");
        setCnpjs(data?.cnpj || "")
        setStateRegistration(data?.stateRegistration || "");
        setPhones(data?.phone || "");
        setEmails(data?.email || "");
        setDataNascimentos(data?.dateOfBirth || "");
        setLocals(data?.address || "");
        setNumeros(data?.number || "");
        setBairros(data?.neighborhood || "");
        setComplements(data?.complement || "");
        setReferences(data?.reference || "");
        setCidades(data?.city || "");
        setEstados(data?.state || "");
        setCeps(data?.cep || "");
        setGeneros(data?.gender || "");
        setNewslatters(data?.newslatter || "");

    }

    useEffect(() => {
        async function loadUser() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

                setNameCompletes(data?.name || "");
                setCnpjs(data?.cnpj || "");
                setCpfs(data?.cpf || "");
                setStateRegistration(data?.stateRegistration || "");
                setPhones(data?.phone || "");
                setEmails(data?.email || "");
                setDataNascimentos(data?.dateOfBirth || "");
                setLocals(data?.address || "");
                setNumeros(data?.number || "");
                setBairros(data?.neighborhood || "");
                setComplements(data?.complement || "");
                setReferences(data?.reference || "");
                setCidades(data?.city || "");
                setEstados(data?.state || "");
                setCeps(data?.cep || "");
                setGeneros(data?.gender || "");
                setNewslatters(data?.newslatter || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadUser();
    }, [customer_id]);

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateNameCustomer?customer_id=${customer_id}`, { name: nameCompletes });
                toast.success('Nome atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value)
    }

    function handleChangeEstado(e: any) {
        setEstadoSelected(e.target.value)
    }

    async function updateDataCustomer() {
        try {
            const apiClient = setupAPIClient();
            if (cpfs === '') {
                toast.error('Não deixe o campo em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, {
                    cpf: cpfs,
                    cnpj: cnpjs,
                    stateRegistration: stateRegistration,
                    phone: phones,
                    dateOfBirth: dataNascimentos,
                    gender: generoSelected,
                    newslatter: newslatters,
                    address: locals,
                    number: numeros,
                    neighborhood: bairros,
                    complement: complements,
                    reference: references,
                    cep: ceps,
                    city: cidades,
                    state: estadoSelected
                });
                toast.success('Dado atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado.');
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
                await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    async function updateNews() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/customer/updateNewslatter?customer_id=${customer_id}`);

            setTimeout(() => {
                Router.reload()
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o preferencia pela newslatters.');
        }
        if (newslatters === "Sim") {
            toast.success(`A preferencia da Newslatters foi ativada.`);
            return;
        }

        if (newslatters === "Nao") {
            toast.error(`A preferencia da Newslatters foi desativada.`);
            return;
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
                                                    handleSubmit={updateDataCustomer}
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
                                                    handleSubmit={updateDataCustomer}
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
                                                    dado={stateRegistration}
                                                    type="text"
                                                    placeholder={stateRegistration}
                                                    value={stateRegistration}
                                                    onChange={(e) => setStateRegistration(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                handleSubmit={updateDataCustomer}
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
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }

                                <BlockDados>
                                    <TextNews>Preferencia para newslatters: <strong>{newslatters}</strong></TextNews>
                                    <ButtonSelect
                                        dado={newslatters}
                                        handleSubmit={updateNews}
                                    />
                                </BlockDados>

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
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }
                            </SectionDate>

                            <SectionDate>

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
                                                handleSubmit={updateDataCustomer}
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
                                                handleSubmit={updateDataCustomer}
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
                                                handleSubmit={updateDataCustomer}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Complemento"}
                                        dados={
                                            <InputUpdate
                                                dado={complements}
                                                type="text"
                                                placeholder={complements}
                                                value={complements}
                                                onChange={(e) => setComplements(e.target.value)}
                                                handleSubmit={updateDataCustomer}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Referência"}
                                        dados={
                                            <InputUpdate
                                                dado={references}
                                                type="text"
                                                placeholder={references}
                                                value={references}
                                                onChange={(e) => setReferences(e.target.value)}
                                                handleSubmit={updateDataCustomer}
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
                                                handleSubmit={updateDataCustomer}
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
                                                        { label: "Acre", value: "AC" },
                                                        { label: "Alagoas", value: "AL" },
                                                        { label: "Amapá", value: "AP" },
                                                        { label: "Amazonas", value: "AM" },
                                                        { label: "Bahia", value: "BA" },
                                                        { label: "Ceara", value: "CE" },
                                                        { label: "Distrito Federal", value: "DF" },
                                                        { label: "Espírito Santo", value: "ES" },
                                                        { label: "Goiás", value: "GO" },
                                                        { label: "Maranhão", value: "MA" },
                                                        { label: "Mato Grosso", value: "MT" },
                                                        { label: "Mato Grosso do Sul", value: "MS" },
                                                        { label: "Minas Gerais", value: "MG" },
                                                        { label: "Pará", value: "PA" },
                                                        { label: "Paraíba", value: "PB" },
                                                        { label: "Paraná", value: "PR" },
                                                        { label: "Pernambuco", value: "PE" },
                                                        { label: "Piauí", value: "PI" },
                                                        { label: "Rio de Janeiro", value: "RJ" },
                                                        { label: "Rio Grande do Norte", value: "RN" },
                                                        { label: "Rio Grande do Sul", value: "RS" },
                                                        { label: "Rondônia", value: "RO" },
                                                        { label: "Roraima", value: "RR" },
                                                        { label: "Santa Catarina", value: "SC" },
                                                        { label: "São Paulo", value: "SP" },
                                                        { label: "Sergipe", value: "SE" },
                                                        { label: "Tocantins", value: "TO" }
                                                    ]
                                                }
                                                handleSubmit={updateDataCustomer}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Cep"}
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
                                                handleSubmit={updateDataCustomer}
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