import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import CategoriasFilterModile from '../../CategoriasFilterModile';
import { ButtonClose, ContainerContent } from './styles';
import { ButtonFilter, Filtros, TextFilter } from '../../../pages/categoria/styles';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import AtributosFilter from '../../AtributosFilter';
import FiltroPrecoMobile from '../../FiltroPrecoMobile';
import { FiltersItens } from '../../../pages/categoria/[slug]';
import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../../services/api';
import Router from 'next/router';


interface FiltersProps {
    isOpen: boolean;
    onRequestClose: () => void;
    filters: FiltersItens;
}

export function ModalFilter({ isOpen, onRequestClose, filters }: FiltersProps) {

    const customStyles = {
        content: {
            top: '56%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '20px',
            transform: 'translate(-50%, -55%)',
            backgroundColor: 'white',
        }
    };

    const [idCateg, setIdCatg] = useState("");
    const [allProductsCategory, setAllProductsCategory] = useState<any[]>([]);
    const [filter, setFilter] = useState<any[]>([]);


    function filterAll() {
        const WEB_URL = 'http://localhost:3001';
        let param = '';
        filter && filter.map((ele) => {
            param = param + 'q=' + ele + '&'
        });
        const NEW_URL = WEB_URL + '?' + param;
        let url = new URL(NEW_URL);
        let params = new URLSearchParams(url.search);

        Router.push(`/filter?${params}`);
    }

    function getValueCateg() {
        var arr = [];
        var inputElements = document.getElementsByName("filter");
        for (var i = 0; inputElements[i]; ++i) {
            /* @ts-ignore */
            if (inputElements[i].checked)
                /* @ts-ignore */
                arr.push(/* @ts-ignore */
                    inputElements[i].value
                );
        }
        setFilter(arr);
        return arr;
    }

    function getValueAttr() {
        var arr = [];
        var inputElements = document.getElementsByName("filter");
        for (var i = 0; inputElements[i]; ++i) {
            /* @ts-ignore */
            if (inputElements[i].checked)
                /* @ts-ignore */
                arr.push(/* @ts-ignore */
                    inputElements[i].value
                );
        }
        setFilter(arr);
        return arr;
    }

    useEffect(() => {
        async function loadSlugDate() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findDateSlugCategory?slug=${filters}`);

                setIdCatg(data?.id);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSlugDate();
    }, [filters]);

    useEffect(() => {
        async function loadAllProductsCategory() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/getAllProductsCategory?slug=${filters}`);

                setAllProductsCategory(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadAllProductsCategory();
    }, [filters]);


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <ButtonClose
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </ButtonClose>
            <br />
            <br />
            <ContainerContent>
                <Filtros>
                    <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                    <TextFilter>Filtrar por:</TextFilter>
                </Filtros>

                <CategoriasFilterModile
                    idCateg={idCateg}
                    onClick={getValueCateg}
                />
                <br />
                <AtributosFilter
                    products={allProductsCategory}
                    onClick={getValueAttr}
                />
                <br />
                <ButtonFilter
                    onClick={filterAll}
                >
                    Buscar
                </ButtonFilter>
                <br />
                <br />
                <FiltroPrecoMobile
                    products={allProductsCategory}
                />
                <br />
                <br />
            </ContainerContent>
        </Modal>
    )
}