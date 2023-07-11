import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import {
    Box,
    BoxAvaliacoes,
    BoxContainerAvalietion,
    ButtonPage,
    ContainerAvaliacoes,
    ContainerPage,
    ContainerPagination,
    DateAvaliacao,
    Description,
    NameClient,
    Next,
    PointBom,
    PointExcelente,
    PointOtimo,
    PointPessimo,
    PointRuim,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "./styles";
import moment from 'moment';
import { Avisos } from "../Avisos";


interface AvalietionRequest {
    product_id: string;
}

const AvaliacoesBox = ({ product_id }: AvalietionRequest) => {

    const [total, setTotal] = useState(0);
    const [limit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [avaliations, setAvaliations] = useState<any[]>([]);

    useEffect(() => {
        async function loadAvalietionProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/pageAvalietionStoreProduct?page=${currentPage}&limit=${limit}&product_id=${product_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setAvaliations(data?.avalientionProduct || []);

            } catch (error) {
                console.log(error.data.response);
            }
        }
        loadAvalietionProduct();
    }, [currentPage, limit, product_id, total]);
    

    return (
        <>
            {avaliations?.length < 1 ? (
                <>
                    <br />
                    <br />
                    <Avisos texto="Esse produto não foi avaliado por ninguém ainda..." />
                    <br />
                    <br />
                </>
            ) :
                <>
                    <br />
                    <br />
                    <br />
                    <ContainerAvaliacoes>
                        <ContainerPagination>
                            <TotalBoxItems key={total}>
                                <TextTotal>Total de avaliações: {total}</TextTotal>
                            </TotalBoxItems>
                            <ContainerPage>
                                {currentPage > 1 && (
                                    <Previus>
                                        <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                            Voltar
                                        </ButtonPage>
                                    </Previus>
                                )}

                                {pages.map((page) => (
                                    <TextPage
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </TextPage>
                                ))}

                                {currentPage < avaliations.length && (
                                    <Next>
                                        <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                            Avançar
                                        </ButtonPage>
                                    </Next>
                                )}
                            </ContainerPage>
                        </ContainerPagination>
                        <BoxContainerAvalietion>
                            {avaliations.map((item) => {
                                return (
                                    <BoxAvaliacoes key={item?.id}>
                                        <NameClient>{item?.customer?.name}</NameClient>
                                        {item?.point === "Péssimo" && (
                                            <Box>
                                                <PointPessimo>{item?.point}</PointPessimo>
                                            </Box>
                                        )}
                                        {item?.point === "Ruim" && (
                                            <Box>
                                                <PointRuim>{item?.point}</PointRuim>
                                            </Box>
                                        )}
                                        {item?.point === "Bom" && (
                                            <Box>
                                                <PointBom>{item?.point}</PointBom>
                                            </Box>
                                        )}
                                        {item?.point === "Ótimo" && (
                                            <Box>
                                                <PointOtimo>{item?.point}</PointOtimo>
                                            </Box>
                                        )}
                                        {item?.point === "Excelente" && (
                                            <Box>
                                                <PointExcelente>{item?.point}</PointExcelente>
                                            </Box>
                                        )}
                                        <Description>{item?.description}</Description>
                                        <DateAvaliacao>{moment(item?.created_at).format('DD/MM/YYYY - HH:mm')}</DateAvaliacao>
                                    </BoxAvaliacoes>
                                )
                            })}
                        </BoxContainerAvalietion>
                    </ContainerAvaliacoes>
                    <br />
                    <br />
                    <br />
                </>
            }
        </>
    );
};

export default AvaliacoesBox;