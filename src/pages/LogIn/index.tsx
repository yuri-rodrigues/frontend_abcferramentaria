import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import ImgLogo from '../../assets/abc-logo.png';

import {
  Container,
  Logo,
  LogoText,
  FormComponent,
  InputComponent,
  LogInButton,
} from './styles';


interface IFormData {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: IFormData) => {
    signIn({
      email: data.email,
      password: data.password,
    });

    history.push('/dashboard/home');
  }, [signIn, history]);

  return (
    <>
      <Container>
        <FormComponent onSubmit={handleSubmit}>
          <InputComponent name="email" placeholder="Digite seu e-mail" />
          <InputComponent name="password" placeholder="Digite sua senha" />

          <LogInButton type="submit">
            Logar
          </LogInButton>

          <LogoText>Ferramentaria</LogoText>
        </FormComponent>

        <Logo src={ImgLogo} />
      </Container>
    </>
  );
};

export default LogIn;