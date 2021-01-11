import React, { createContext, useCallback, useState, useContext } from 'react';
import { message } from 'antd';
import api from '../services/api';

interface AuthState {
  token: string,
  user: object,
}


interface SignInCredentials {
  email: string,
  password: string,
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>,
  signOut(): Promise<void>
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

  const [data, setData] = useState<AuthState>( () => {
    const user = localStorage.getItem('@invillia:user');
    const token = localStorage.getItem('@invillia:token');

    if(user && token){
      return {token, user: JSON.parse(user)};
    }

    return {} as AuthState;

  });

  const signIn = useCallback(async ({email, password}) => {
    try {
      await api.post('/api/v1/auth/login', { email, password})
      .then(result => {
        const { token, user } = result.data;

        // set User/Token
        localStorage.setItem('@invillia:user', JSON.stringify(user));
        localStorage.setItem('@invillia:token', token);

        setData({token, user});

        message.success(`Bem vindo ${user.name}`, 3);
      })
      .catch(err => {
        if(err.response.data.errors){
          const errors = err.response.data.errors;
          Object.keys(errors).forEach((campo) => {
            message.warning(errors[campo], 5);
          });
        }
      });
    } catch {
      message.warning("Ocorreu um erro interno ao efeturar Login");
    }

  },[]);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@invillia:user');
    localStorage.removeItem('@invillia:token');

    setData({} as AuthState);
  },[]);

  return (
    <>
      <AuthContext.Provider value={{user: data.user, signIn, signOut}} >
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() : AuthContextData {
  const context = useContext(AuthContext);

  if( !context ){
    throw new Error('Error!');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth };
