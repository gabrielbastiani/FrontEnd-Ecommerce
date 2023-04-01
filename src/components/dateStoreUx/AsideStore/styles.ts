import styled, { css } from 'styled-components';

interface IContainerProps {
    menuIsOpen: boolean;
}


interface IThemeToggleFooterProps {
    menuIsOpen: boolean;
}


export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    background-color: ${(props) => props?.theme?.colors?.white};
    padding-left: 20px;
    border-right: 1px solid ${props => props?.theme?.colors?.black};
    position: relative;

    @media(max-width: 600px){
        padding-left: 20px;
        position: fixed;
        z-index: 2;
        width: 170px;
        height: ${props => props?.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;

        ${props => !props?.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props?.theme?.colors?.black};
        `};
    }
`;

export const Header = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px 0;
`;

export const Title = styled.h3`
    color: ${props => props?.theme?.colors?.black};
    font-size: 26px;
    margin-top: 20px;

    @media(max-width: 600px){
        display: none;
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    a {
        color: ${props => props?.theme?.colors?.black};
        text-decoration: none;

        margin: 15px 0;
        display: flex;
        align-items: center;

        transition: opacity .3s;

        &:hover {
            opacity: .7;
        }

        > svg {
            font-size: 18px;
            margin-right: 5px;
        }
    }
`;

export const MenuItemButton = styled.button`
    cursor: pointer;
    font-size: 16px;
    color: ${props => props?.theme?.colors?.black};
    
    border: none;
    background: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;

    border-radius: 5px;
    font-size: 22px;
    
    background-color: ${props => props?.theme?.colors?.warning};
    color: ${props => props?.theme?.colors?.white};

    transition: opacity .3s;

    &:hover{
        opacity: 0.7;
    }

    display: none;

    @media(max-width: 600px){
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
    display: none;
    position: absolute;
    bottom: 30px;
    flex-direction: column;
    
    @media(max-width: 600px){
        display: ${props => props?.menuIsOpen ? 'flex' : 'none'};
    }

`;