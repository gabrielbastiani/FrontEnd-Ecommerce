import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { InputAttribute, SectionAtributes, SubCategsBlockExtra, TextAtribute, TypeAtribute } from "./styles";
import { FilterText } from "./styles";


interface FilterAtributesRequest {
    products: any;
    onClick(): void;
}

const AtributosFilter = ({ products, onClick }: FilterAtributesRequest) => {

    const [allProductsAttributes, setAllProductsAttributes] = useState([]);
    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display = datasConfigs[0]?.filter_atributes === "Disponivel" ? "block" : "none";

    const filterObj = {};
    const arrayOb = allProductsAttributes.filter((typ) => {
        return filterObj.hasOwnProperty(typ?.type) ? false : (filterObj[typ?.type] = true)
    });

    const arrayIdAttr = products.map((ids: any) => ids?.product_id);
    let paramAttr = '';
    arrayIdAttr && arrayIdAttr.map((item: any) => {
        paramAttr = paramAttr + 'product_id=' + item + '&'
    });
    const valueAttr = '?' + paramAttr;

    useEffect(() => {
        async function loadAttributesproducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/allProductsAndAttributes${valueAttr}`);

                setAllProductsAttributes(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadAttributesproducts();
    }, [valueAttr]);


    return (
        <>
            {arrayOb.length < 1 ? (
                null
            ) :
                <>
                    <TextAtribute
                        style={{ display: display }}
                    >
                        Atributos:
                    </TextAtribute>
                    <SubCategsBlockExtra
                        style={{ display: display }}
                    >
                        {arrayOb.map((item, index) => {
                            return (
                                <>
                                    <TypeAtribute key={index}>{item?.typeAttribute?.type}</TypeAtribute>
                                    {item?.typeAttribute?.valueattribute.map((val: any) => {
                                        return (
                                            <>
                                                {val?.RelationAttributeProduct.map((rel: any, index) => {
                                                    return (
                                                        <SectionAtributes key={index}>
                                                            <InputAttribute
                                                                type='checkbox'
                                                                name="filter"
                                                                id={rel?.valueAttribute?.id}
                                                                value={rel?.valueAttribute?.slug}
                                                                onClick={onClick}
                                                            />
                                                            <FilterText>{rel?.valueAttribute?.value}</FilterText>
                                                        </SectionAtributes>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </>
                            )
                        })}
                    </SubCategsBlockExtra>
                </>
            }
        </>
    );
};

export default AtributosFilter;