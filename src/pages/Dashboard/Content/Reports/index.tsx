import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';

import {
  Container,
  Content,
} from './styles';

interface Supplier {
  id: string;
  cnpj: string;
  nome_fantasia: string;
  razaosocial: string;
  inscr_estadual: string;
  nome: string;
  obs: string;
}

interface AccountGroup {
  id: string;
  nome: string;
  descricao: string;
  obs: string;
}

interface BankAccount {
  id: string;
  num_account: number;
  balance: number;
}

interface IDebts {
  id: string;
  supplier_id: Supplier;
  account_group_id: AccountGroup;
  bank_account_id: BankAccount;
  value: number,
  juros: number,
  parcela: number,
  data_emissao: Date;
  data_vencimento: Date;
  data_quitacao: Date;
  status: 'paga' | 'vencida' | 'aberta',
  obs: string;
}

const Reports: React.FC = () => {
  const [debts, setDebts] = useState<IDebts[]>([]);

  useEffect(() => {
    async function loadDebts() {
      const response = await api.get('debts');

      setDebts(response.data.allDebts);
    }

    loadDebts();
  }, []);

  const handleSubmit = () => { };
  return (
    <>
      <Container>
        <h3>Relatórios</h3>

        <Content>
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Grupo</th>
              <th>Conta Bancária</th>
              <th>Valor</th>
              <th>Juros</th>
              <th>Parcela</th>
              <th>Data Emissão</th>
              <th>Data Vencimento</th>
              <th>Data Quitação</th>
              <th>Status</th>
              <th>Observação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {debts.map(debt => (
              <tr key={debt.id}>
                <td>{debt.supplier_id.razaosocial}</td>
                <td>{debt.account_group_id.nome}</td>
                <td>{debt.bank_account_id.num_account}</td>
                <td>{debt.value}</td>
                <td>{debt.juros}</td>
                <td>{debt.parcela}</td>
                <td>{debt.data_emissao}</td>
                <td>{debt.data_vencimento}</td>
                <td>{debt.data_quitacao}</td>
                <td>{debt.status}</td>
                <td>{debt.obs}</td>
                <td>
                  <input type="checkbox" value={debt.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Content>
        <button onClick={handleSubmit}>SIMULAR CONTA PRIORITÁRIA</button>
      </Container>
    </>
  );
};

export default Reports;