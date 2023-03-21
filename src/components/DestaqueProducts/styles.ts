import styled from "styled-components";

export const SectionDestaqueProducts = styled.section`
    margin: 100px 20px;
`

export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
`

export const TitleSection = styled.h1`
    color: ${props => props?.theme?.colors?.black};
    flex: 2;
    text-transform: capitalize;
`

export const ContentText = styled.p`
    color: ${props => props?.theme?.colors?.gray};
    flex: 3
`

export const Bottom = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
`