import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  matricula: string;
  funcao: string;
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
  useAuth(): IAuthContext;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@api-cap:token');
    const user = localStorage.getItem('@api-cap:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email, password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@api-cap:token', token);
    localStorage.setItem('@api-cap:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@api-cap:token');
    localStorage.removeItem('@api-cap:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, useAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider }