import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [userSession, setUserSession] = useState('');

    useEffect(() => {
        setUserSession('');
    }, []);

    function createUserSession(userSession) {
        setUserSession(userSession);
    }

    function deleteUserSession() {
        setUserSession('');
    }

    const objectContext = {
        userSession,
        createUserSession,
        deleteUserSession,
    };

    return (
        <UserContext.Provider value={objectContext}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;
