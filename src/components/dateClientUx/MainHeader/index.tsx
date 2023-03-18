import React, { useContext, useMemo, useState } from 'react';
import { 
    Container, 
    Profile, 
    Welcome, 
    UserName
}  from './styles';
import { AuthContext } from '../../../contexts/AuthContext';


export const MainHeader = () => {

    const { user } = useContext(AuthContext);

    return (
        <Container>
            <Profile>
                <Welcome>Olá</Welcome>
                <UserName>{user?.nameComplete}</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;