import Titulos from "../Titulos";
import { Container, TableContainer, TbodyContent, TdContent, ThContent, TheadContent, TrContent, BoxTitulo } from "./styles";

interface AtributeRequest {
    atributes: any;
}

const AtributesProduct = ({ atributes }: AtributeRequest) => {

    return (
        <Container>
            <BoxTitulo>
                <Titulos tipo="h1" titulo="Atributos/Caracterisitcas do Produto" />
            </BoxTitulo>
            <TableContainer>
                <TheadContent>
                    <TrContent>
                        {atributes.map((item: any) => {
                            return (
                                <ThContent key={item?.id}>{item?.type}</ThContent>
                            )
                        })}
                    </TrContent>
                </TheadContent>
                <TbodyContent>
                    <TrContent>
                        {atributes.map((val: any) => {
                            return (
                                <TdContent key={val?.id}>{val?.valueAttribute?.value}</TdContent>
                            )
                        })}
                    </TrContent>
                </TbodyContent>
            </TableContainer>
        </Container>
    )
}

export default AtributesProduct;