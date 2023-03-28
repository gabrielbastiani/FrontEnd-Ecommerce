import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BoxTitle, Title } from '../DestaqueProducts/styles';
import {
    SectionCategorysHome,
    GridContainer,
    BoxCategory
} from './styles';
import { setupAPIClient } from '../../services/api';
import { MdCategory } from 'react-icons/md';


const BlockCategoriasHome = () => {

    const [categoryNames, setCategoryNames] = useState([]);
    const orderArray = categoryNames.slice(0, 8);

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allCategorys`);

                setCategoryNames(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCategorys();
    }, []);

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/[/]/g, "-");
    }


    return (
        <>
            <BoxTitle>
                <Title>Categorias</Title>
            </BoxTitle>
            <SectionCategorysHome>
                <GridContainer>
                    {orderArray.map((item) => {
                        return (
                            <Link href={`/categoria/${removerAcentos(item.categoryName)}`} target="_blank">
                                <BoxCategory>
                                    <MdCategory color='white' size={55} />
                                    {item.categoryName}
                                </BoxCategory>
                            </Link>
                        )
                    })}
                </GridContainer>
            </SectionCategorysHome>
        </>
    )
}

export default BlockCategoriasHome;