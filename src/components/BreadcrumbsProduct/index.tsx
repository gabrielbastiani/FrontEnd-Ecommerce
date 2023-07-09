import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Boxbreadcrumbs, Bread } from "../dateStoreUx/styles";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { ActualBread, BoxBread, BreadAtual } from "./styles";


interface BreadcrumbsRequest {
    product_id: string;
}

const BreadcrumbsProduct = ({ product_id }: BreadcrumbsRequest) => {

    const [allCategoriesMenu, setAllCategoriesMenu] = useState<any>([]);
    const [dataMainCAtegory, setDataMainCAtegory] = useState<any>([]);

    useEffect(() => {
        async function loadCategoryMainProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findMainCategoryProduct?product_id=${product_id}`);

                setDataMainCAtegory(data);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCategoryMainProduct();
    }, [product_id]);

    useEffect(() => {
        async function allCategoriesMenus() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listMenuCategories`);

                setAllCategoriesMenu(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        allCategoriesMenus();
    }, []);

    useEffect(() => {
        const treeProductCrumb = document.querySelector('div#treeProductCrumb');
        const crumbs = document.createElement('span');
        const main = dataMainCAtegory.filter((item: { mainCategory: string; }) => item?.mainCategory === "Sim");
        const categoryMain = main.map((catg: { category: { id: any; }; }) => catg?.category?.id);
        const idCateg = String(categoryMain);
        const brand = dataMainCAtegory.filter((item: { category: { id: string; }; }) => item?.category?.id === idCateg);

        brand.forEach(buildTreeCrumbProduct);

        function buildTreeCrumbProduct(item: any) {
            const span = document.createElement('span');
            span.innerHTML = `<a href=http://localhost:3001/categoria/${item?.category?.slug}>${item?.category?.name}</a>` + " / ";

            const groupName = allCategoriesMenu.slice(0, 1).map((item: { nameGroup: any; }) => item?.nameGroup);

            const nameGroup = String(groupName);

            const children = allCategoriesMenu.filter((child: { category: { id: any; }; nameGroup: string; }) => child?.category?.id === item?.category?.parentId && child?.nameGroup === nameGroup);

            children.forEach(buildTreeCrumbProduct);
            crumbs.appendChild(span);
        }

        treeProductCrumb.appendChild(crumbs);

    }, [allCategoriesMenu, dataMainCAtegory]);


    return (
        <>
            <Bread>
                <Boxbreadcrumbs>
                    <BoxBread>
                        <Link href="http://localhost:3001">
                            <IoIosHome size={22} color="red" /> / &nbsp;
                        </Link>

                        <div id="treeProductCrumb"></div>
                        
                    </BoxBread>
                </Boxbreadcrumbs>
            </Bread>
        </>
    );
};

export default BreadcrumbsProduct;