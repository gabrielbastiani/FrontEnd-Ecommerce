import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderStore } from "../../components/HeaderStore";
import { PageSection } from "../../components/dateStoreUx/styles";
import { Avisos } from "../../components/Avisos";
import Titulos from "../../components/Titulos";
import { ContentBox, EtiquetaContato, InputContact, MessageArea, OpcoesSector, SectionPage, SelectSector } from "./styles";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import Router from "next/router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";


export default function Atendimento() {

    const [content, setContent] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [company, setCompany] = useState("");

    const [sectorSelected, setSectorSelected] = useState();

    function handleChangeSector(e: any) {
        setSectorSelected(e.target.value);
    }

    function isEmail(email: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
    };

    async function sendMessageStore() {
        try {
            if (name === '' ||
                email === '' ||
                phone === '' ||
                message === ''
            ) {
                toast.error('Preencha todos os campos');
                return
            }

            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/createContact', {
                name: name,
                email: email,
                phone: phone,
                company: company || null,
                sector: sectorSelected,
                message: message
            });

            toast.success('Mensagem enviada com sucesso!!!');

            setLoading(false);

            Router.push('/');

        } catch (error) {
            console.log(error.response.data);
            toast.error('Ops erro ao enviar mensagem para loja!!!')
        }
    }

    useEffect(() => {
        async function loadPages() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listInstitutionalText?slugPosition=pagina-contato`);
                setContent(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadPages();
    }, []);

    return (
        <>
            <Head>
                <title>Contato</title>
            </Head>

            <HeaderStore />
            <br />
            <br />
            <PageSection>
                <SectionPage>
                    <Titulos tipo="h1" titulo="Entre em contato conosco através do formulário" />
                    <ContentBox>
                        <EtiquetaContato>Nome completo*
                            <br />
                            <InputContact
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </EtiquetaContato>
                        <br />
                        <br />
                        <EtiquetaContato>E-mail*
                            <br />
                            <InputContact
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </EtiquetaContato>
                        <br />
                        <br />
                        <EtiquetaContato>Telefone*
                            <br />
                            <Input
                                style={{ background: 'white', color: 'black' }}
                                /* @ts-ignore */
                                as={IMaskInput}
                                /* @ts-ignore */
                                mask="(00) 0000-0000"
                                type="text"
                                placeholder="(00) 0000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </EtiquetaContato>
                        <br />
                        <br />
                        <EtiquetaContato>Se for de alguma empresa, digite o nome dela se não deixe em branco
                            <br />
                            <InputContact
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </EtiquetaContato>
                        <br />
                        <br />
                        <EtiquetaContato>Escolha o setor o qual deseja atendimento:
                            <br />
                            <SelectSector
                                value={sectorSelected}
                                onChange={handleChangeSector}
                            >
                                <OpcoesSector value="Recursos Humanos">Recursos Humanos</OpcoesSector>
                                <OpcoesSector value="Vendas">Vendas</OpcoesSector>
                                <OpcoesSector value="Atendimento da loja virtual">Atendimento da loja virtual</OpcoesSector>
                                <OpcoesSector value="Assistencia Técnica">Assistencia Técnica</OpcoesSector>
                                <OpcoesSector value="Marketing">Marketing</OpcoesSector>
                                <OpcoesSector value="Financeiro">Financeiro</OpcoesSector>
                                <OpcoesSector value="Sugestoes e reclamaçoes">Sugestoes e reclamaçoes</OpcoesSector>
                            </SelectSector>
                        </EtiquetaContato>
                        <br />
                        <br />
                        <EtiquetaContato>Deixe sua mensagem*
                            <br />
                            <MessageArea
                                placeholder="Digite aqui..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></MessageArea>
                        </EtiquetaContato>
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={sendMessageStore}
                            loading={loading}
                        >
                            Enviar mensagem
                        </Button>
                    </ContentBox>
                </SectionPage>
                <br />
                <br />
                <br />
                {content.map((item) => {
                    return (
                        <SectionPage>
                            <ContentBox
                                dangerouslySetInnerHTML={{ __html: item?.description }}
                            ></ContentBox>
                            <br />
                            <br />
                        </SectionPage>
                    )
                })}
            </PageSection>
            <br />
            <br />
            <br />
            <br />
            <FooterStore />
            <FooterAccount />
        </>
    )
}