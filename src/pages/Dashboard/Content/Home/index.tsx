import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../services/api';

import {
  Container,
} from './styles';

const Home: React.FC = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; //Janeiro: 0  Dezembro: 11
  const year = date.getFullYear();
  const hour = date.getHours();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadTotal() {
      const today = new Date();

      const response = await api.get('debts', {
        params: {
          today
        }
      });

      setTotal(response.data.todayDebts[1]);
    }

    loadTotal();
  }, []);

  return (
    <>
      <Container>
        <p>Hoje é dia:</p>
        <h3>{day}/{month}/{year}</h3>
        {
          hour > 12 ?
            (<h1>Boa Tarde!</h1>) :
            hour > 18 ?
              (<h1>Boa Noite!</h1>) :
              (<h1>Bom Dia!</h1>)
        }
        <h3>Você Possui {total} Conta{total > 1 ? 's' : null} Vencendo Hoje</h3>

        <Link to="/dashboard/debts">Ir Para as Contas</Link>
      </Container>
    </>
  );
};

export default Home;