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


    return (
        <>
            {orderArray.length < 1 ? (
                null
            ) :
                <>
                    <BoxTitle>
                        <Title>Categorias</Title>
                    </BoxTitle>
                    <SectionCategorysHome>
                        <GridContainer>
                            {orderArray.map((item) => {
                                return (
                                    <Link key={item.id} href={`/categoria/${item.slug}`} target="_blank">
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
            }
        </>
    )
}

export default BlockCategoriasHome;