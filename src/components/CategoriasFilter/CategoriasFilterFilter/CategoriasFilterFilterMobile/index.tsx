import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../../services/api";
import { SubCategsBlockExtra, TextAtribute } from "./styles";


interface FilterCategoryRequest {
    onClick(): void;
}

const CategoriasFilterFilterMobile = ({ onClick }: FilterCategoryRequest) => {

    const [categs, setCategs] = useState<any[]>([]);

    useEffect(() => {
        async function loadCategs() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listCategorysDisponivel`);

                setCategs(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCategs();
    }, []);

    useEffect(() => {

        const treefiltermobile = document.querySelector('div#treefiltermobile');
        const menu = document.createElement('div');

        const firstLevel = categs.filter(item => !item?.parentId);
        const getFirstLis = firstLevel.map(buildTree);
        getFirstLis.forEach(label => menu.append(label));

        function buildTree(item: any) {

            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = "filter";
            checkbox.id = item?.id;
            checkbox.value = item?.slug;
            checkbox.checked;
            checkbox.onclick = (onClick);

            checkbox.style.marginRight = '10px';
            checkbox.style.marginBottom = '10px';

            const textContent = document.createTextNode(`${item?.name}`);

            label.appendChild(checkbox);
            label.appendChild(textContent);

            const children = categs.filter(child => child?.parentId === item?.id);
            const subMenu = document.createElement('div');

            children.map(buildTree)
                .forEach(label => subMenu.appendChild(label))
            label.appendChild(subMenu);

            return label;
        }

        treefiltermobile.appendChild(menu);

    }, [categs]);


    return (
        <>
            <TextAtribute>Categorias:</TextAtribute>
            <SubCategsBlockExtra>

                <div id="treefiltermobile"></div>

            </SubCategsBlockExtra>
        </>
    );
};

export default CategoriasFilterFilterMobile;