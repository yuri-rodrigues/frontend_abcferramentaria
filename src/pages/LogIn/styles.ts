import styled from 'styled-components';
import { Form } from '@unform/web';

import Input from '../../components/Input'

import BackgroundImage from '../../assets/bgimg.png';

export const Container = styled.div`
  background-image: url(${BackgroundImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  height: 645px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 200px;

  position: absolute;

  top: 80px;
`;

export const LogoText = styled.h3`
  font-family: Courier New, monospace;
  color: #4F4F4F;

  font-size: 1.2em;

  position: absolute;

  top: 150px;
  right: 420px;
`;

export const LogInButton = styled.button`
  font-family: Courier New, monospace;
  font-weight: bold;
  color: #fff;

  background-color: #A8262F;
    
  border: 2px solid #A70000;

  padding: 5px 20px;
   
  height: 45px;
  width: 200px;
`;

export const FormComponent = styled(Form)`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 530px;
  height: 330px;

  background-color: #fff;

  opacity: 0.7;
`;

export const InputComponent = styled(Input)`
  height: 25px;
  
  margin: 5px;

  border: 1px solid darkred;

  border-radius: 4px;

  ::placeholder{
    text-align: center;
    font-family: Courier New, monospace;
  }
`;