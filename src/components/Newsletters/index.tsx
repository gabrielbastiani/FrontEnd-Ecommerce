import { useEffect, useState } from 'react';
import {
    SectionContato,
    BlockContato,
    TextNews
} from './styles';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';


const Newsletters = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loja_id, setLoja_id] = useState('');

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);
                setLoja_id(response.data.id || "");
                
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    function isEmail(email: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
    }

    async function handleNewsLatters() {
        try {
            if (name === '') {
                toast.error('Digite seu nome!');
                return;
            }

            if (email === '') {
                toast.error('Por favor digite um email valido!');
                return;
            }

            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createNewsletter', {name: name, email: email, loja_id: loja_id});

            toast.success('Dados enviados com sucesso!');

            setName('');
            setEmail('');

        } catch (error) {
            toast.error('Esse endereço de e-mail ja está cadastrado!');
            console.log(error)
        }
    }


    return (
        <SectionContato>
            <BlockContato>
                <TextNews>Receba nossas ofertas!</TextNews>
                <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </BlockContato>
            <BlockContato>
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </BlockContato>
            <BlockContato>
                <Button
                    style={{ padding: '10px', marginBottom: '13px' }}
                    type="submit"
                    onClick={handleNewsLatters}
                >
                    Enviar
                </Button>
            </BlockContato>
        </SectionContato>
    )
}

export default Newsletters;