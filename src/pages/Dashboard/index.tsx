import React, { useState } from 'react';
import DashboardRouter from '../../routes/dashboard.routes';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

import {
  Container,
  ColumnContainer,
  Content,
} from './styles';


const Dashboard: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleMenu = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <SideBar visible={visible} />

      <ColumnContainer>
        <Header toggleMenu={handleMenu} open={visible} />

        <Content>
          <DashboardRouter />
        </Content>
      </ColumnContainer>
    </Container >
  );
}

export default Dashboard;