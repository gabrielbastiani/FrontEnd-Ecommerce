import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BoxTitle, Title } from '../DestaqueProducts/styles';
import {
    SectionCategorysHome,
    GridContainer,
    BoxCategory
} from './styles';
import { setupAPIClient } from '../../services/api';
import Image from 'next/image';


const BlockCategoriasHome = () => {

    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/pocisaoListGroup?slugPosicao=home-page&slugCategoryOrItem=home-page`);

                setCategoryNames(data?.group || []);

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
                                        {item?.imagegroupcategories[0]?.imageGroup ? (
                                            <Image
                                                src={'http://localhost:3333/files/' + item?.imagegroupcategories[0]?.imageGroup}
                                                alt={item?.itemName}
                                                width={330}
                                                height={90}
                                            />
                                        ) :
                                            null
                                        }
                                        <BoxCategory>
                                            {item?.category?.categoryName}
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