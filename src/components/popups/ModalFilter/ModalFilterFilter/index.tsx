import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent } from './styles';
import { ButtonFilter, Filtros, TextFilter } from '../../../../pages/categoria/styles';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import { useState } from 'react';
import Router from 'next/router';
import CategoriasFilterFilterMobile from '../../../CategoriasFilter/CategoriasFilterFilter/CategoriasFilterFilterMobile';
import AtributosFilterFilter from '../../../AtributosFilter/AtributosFilterFilter';
import FiltroPrecoFilterMobile from '../../../FiltroPreco/FiltroPrecoMobile/FiltroPrecoFilterMobile';


interface FiltersProps {
    isOpen: boolean;
    onRequestClose: () => void;
    productsFilter: any
}

export function ModalFilterFilter({ isOpen, onRequestClose, productsFilter }: FiltersProps) {

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

                <CategoriasFilterFilterMobile
                    onClick={getValueCateg}
                />
                <br />
                <AtributosFilterFilter
                    products={productsFilter}
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
                <FiltroPrecoFilterMobile
                    products={productsFilter}
                />
                <br />
                <br />
            </ContainerContent>
        </Modal>
    )
}