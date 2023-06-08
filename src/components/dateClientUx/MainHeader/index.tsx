import React, { useContext, useMemo, useState } from 'react';
import { 
    Container, 
    Profile, 
    Welcome, 
    UserName
}  from './styles';
import { AuthContext } from '../../../contexts/AuthContext';


export const MainHeader = () => {

    const { customer } = useContext(AuthContext);

    return (
        <Container>
            <Profile>
                <Welcome>Olá</Welcome>
                <UserName>{customer?.name}</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;