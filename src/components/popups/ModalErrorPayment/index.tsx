import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent, TextError } from './styles';


interface DeleteContatos {
    isOpen: boolean;
    onRequestClose: () => void;
    menssage: string;
}

export function ModalErrorPayment({ isOpen, onRequestClose, menssage }: DeleteContatos) {

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
                <TextError>{menssage}</TextError>
            </ContainerContent>
        </Modal>
    )
}