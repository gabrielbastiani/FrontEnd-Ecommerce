import { InputSearch } from './styles';

interface SearchRequest {
    valor: string;
    onChange: () => void;
    placeholder: string;
    onKeyUp: () => void;
    onKeyDown: () => void;
    onClick(): void;
    style: string;
}

const PesquisaHeaderStore = ({ style, valor, onChange, placeholder, onKeyUp, onKeyDown, onClick }: SearchRequest) => (

    <InputSearch
    style={{ display: style }}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onClick={onClick}
    />
)

export default PesquisaHeaderStore;