import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Container, TagsName } from "./styles";

interface TagRequest {
    product_id: string;
}

export const TagsProduct = ({ product_id }: TagRequest) => {

    const [tags, setTags] = useState<any []>([]);

    useEffect(() => {
        async function loadTagsProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/allTagProducts?product_id=${product_id}`);
                setTags(data || []);
            } catch (error) {
                console.log(error.response.data);
            };
        }
        loadTagsProduct();
    }, [product_id]);


    return (
        <Container>
            {tags.map((item) => {
                return (
                    <TagsName key={item?.id}>#{item?.tagName}</TagsName>
                )   
            })}
        </Container>
    )
}

export default TagsProduct;