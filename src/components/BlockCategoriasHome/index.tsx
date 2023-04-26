import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BoxTitle, Title } from '../DestaqueProducts/styles';
import {
    SectionCategorysHome,
    GridContainer,
    BoxCategory
} from './styles';
import { setupAPIClient } from '../../services/api';


const BlockCategoriasHome = () => {

    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/pocisaoListGroup?slugPosicao=menu-topo`);

                setCategoryNames(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadGroups();
    }, []);


    return (
        <>
            {categoryNames.length < 1 ? (
                null
            ) :
                <>
                    <BoxTitle>
                        <Title>Categorias</Title>
                    </BoxTitle>
                    <SectionCategorysHome>
                        <GridContainer>
                            {categoryNames.map((item) => {
                                return (
                                    <Link key={item.id} href={`/categoria/${item?.category?.slug}`} target="_blank">
                                        <div>
                                            {item?.imagegroupcategories?.imageGroup}
                                            <BoxCategory>
                                                {item?.category?.categoryName}
                                            </BoxCategory>
                                        </div>
                                        
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