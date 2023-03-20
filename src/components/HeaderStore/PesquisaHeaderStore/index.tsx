import { InputSearch } from './styles';

interface SearchRequest {
    valor: string;
    onChange: () => void;
    placeholder: string;
    onClick(): void;
}

const PesquisaHeaderStore = ({ valor, onChange, placeholder, onClick}: SearchRequest) => (
    <InputSearch value={valor} onChange={onChange} placeholder={placeholder} onClick={onClick} />
)

export default PesquisaHeaderStore;