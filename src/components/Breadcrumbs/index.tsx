import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Boxbreadcrumbs, Bread } from "../dateStoreUx/styles";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";


interface BreadcrumbsRequest {
    idParent: string;
    idCateg: string;
    groupName: string;
}

const Breadcrumbs = ({ idParent, idCateg, groupName }: BreadcrumbsRequest) => {

    const [allCategoriesMenu, setAllCategoriesMenu] = useState([]);
    const [brandCrumb, setBrandCrumb] = useState([]);


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
        async function loadBrandCrumb() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/categoriesParentIdBradCrumb?parentId=${idParent}`);

                setBrandCrumb(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBrandCrumb();
    }, [idParent]);

    useEffect(() => {
        const treeCrumb = document.querySelector('div#treeCrumb');
        const crumbs = document.createElement('span');
        const brand = brandCrumb.filter(item => item?.category?.id === idCateg);

        brand.forEach(buildTreeCrumb);

        function buildTreeCrumb(item: any) {
            const span = document.createElement('span');
            span.innerHTML = `<a href=http://localhost:3001/categoria/${item?.category?.slug}>${item?.category?.name} / </a>`;

            const children = allCategoriesMenu.filter(child => child?.category?.id === item?.category?.parentId && child?.nameGroup === groupName);

            children.forEach(buildTreeCrumb);
            crumbs.appendChild(span);
        }

        treeCrumb.appendChild(crumbs);

    }, [allCategoriesMenu, brandCrumb]);


    return (
        <>
            <Bread>
                <Boxbreadcrumbs>
                    <Link href="http://localhost:3001">
                        <IoIosHome size={22} color="red" /> / &nbsp;
                    </Link>

                    <div id="treeCrumb"></div>

                </Boxbreadcrumbs>
            </Bread>
        </>
    );
};

export default Breadcrumbs;