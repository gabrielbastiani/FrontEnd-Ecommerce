import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';


interface ModalDeleteCupomRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    customerID: string;
}

export function ModalDesabledCustomer({ isOpen, onRequestClose, customerID }: ModalDeleteCupomRequest) {

    const { signOut } = useContext(AuthContext);

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            zIndex: 9999999
        }
    };


    async function handleDesativadoCustomer() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/customer/activeOrDesactiveCustomerAcount?customer_id=${customerID}`);

            toast.success(`Cliente desativado com sucesso.`);

            onRequestClose();
            signOut();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao desativado a sua conta.');
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

                <TextModal>Deseja mesmo desativar seu cadastro?</TextModal>
                <TextModal>OBS: Caso um dia queira reativar essa conta<br/>Entre em contato conosco por algum canal de atendimento<br/>oficial aqui da loja para que possamos ajuda-lo.</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDesativadoCustomer}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}