import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { SubCategsBlockExtra, TextAtribute } from "./styles";


interface FilterCategoryRequest {
    onClick(): void;
}

const CategoriasFilterFilter = ({ onClick }: FilterCategoryRequest) => {

    const [categs, setCategs] = useState<any[]>([]);
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

    const display = datasConfigs[0]?.filter_categorys === "Disponivel" ? "block" : "none";

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

        const treefilter = document.querySelector('div#treefilter');
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

        treefilter.appendChild(menu);

    }, [categs]);


    return (
        <>
            <TextAtribute
                style={{ display: display }}
            >
                Categorias:
            </TextAtribute>
            <SubCategsBlockExtra
                style={{ display: display }}
            >

                <div id="treefilter"></div>

            </SubCategsBlockExtra>
        </>
    );
};

export default CategoriasFilterFilter;