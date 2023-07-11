import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContAvaliacao, ContainerContent, OpcoesAvaliacao, SelectAvaliacao, TextAreaAvaliacao } from './styles';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { ButtonCreateAccount, ContLogin, Formulario, LinkCreateAccount, Recaptcha, TextInfo, TextLink } from '../../../pages/loginClient/styles';
import Titulos from '../../Titulos';
import { Input } from '../../ui/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '../../ui/Button';
import Link from 'next/link';
import { BlockInputs, EtiquetaInput } from '../../../pages/createAccount/styles';
import { setupAPIClient } from '../../../services/api';
import Router from 'next/router';


interface PropostaRequest {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function ModalLoginProposta({ isOpen, onRequestClose }: PropostaRequest) {

    const customStyles = {
        content: {
            top: '57%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px'
        }
    };

    async function handleRegisterProposta() {
        try {
            
            const apiClient = setupAPIClient();
            await apiClient.post('/createAvalietion', {
                
            });

            toast.success('Sua contraproposta foi enviada com sucesso... Em breve retornamos contato com você.');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
        }
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

            <ContainerContent>

                

            </ContainerContent>
        </Modal >
    )
}