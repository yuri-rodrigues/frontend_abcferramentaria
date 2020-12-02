import React from 'react';

import LogoImage from '../../assets/abc-logo.png';

import {
  Container,
  Logo,
  MenuContainer,
  MenuList,
  MenuItem,
  LinkComponent,
} from './styles';

interface ISideBarProps {
  visible: boolean;
}

const SideBar: React.FC<ISideBarProps> = ({ visible }) => {
  return (
    <Container visible={visible}>
      <LinkComponent to='/dashboard/home'>
        <Logo src={LogoImage} alt="logo" />
      </LinkComponent>


      <MenuContainer>
        <MenuList>
          <MenuItem>
            <LinkComponent to="/dashboard/users">Usuários</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/debts">Contas a pagar</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/suppliers">Fornecedores</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/account-groups">Grupo de Contas</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/agencies">Agências Bancárias</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/bank-accounts">Contas Bancárias</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/reports">Relatórios</LinkComponent>
          </MenuItem>
          <MenuItem>
            <LinkComponent to="/dashboard/simulation">Simulação</LinkComponent>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    </Container>
  );
};

export default SideBar;