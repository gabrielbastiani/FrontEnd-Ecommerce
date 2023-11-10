import styled from "styled-components";

export const LinhaDivisoria = styled.hr`
    height: 2px;
    background: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.gray};
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 25px;
`;