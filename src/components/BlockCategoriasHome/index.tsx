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
                const { data } = await apiClient.get(`/positionListMenu?slugPosition=home-page&slugCategory=neutro`);

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
                            {categoryNames.map((item, index) => {
                                return (
                                    <Link key={index} href={`/categoria/${item?.category?.slug}`} target="_blank">
                                        {item?.imagemenucategories[0]?.image ? (
                                            <Image
                                                src={'http://localhost:3333/files/' + item?.imagemenucategories[0]?.image}
                                                alt={item?.categoryName}
                                                width={330}
                                                height={90}
                                            />
                                        ) :
                                            null
                                        }
                                        <BoxCategory>
                                            {item?.category?.name}
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