import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowDownCircle, FiPlusCircle } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiXCircle } from 'react-icons/fi'

import api from '../../../../services/api';

import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';

import {
  Container,
  Content,
  Pagination,
  Nav,
  Next,
  Item,
  Prev,
  ButtonContainer,
  NewUserButton,
  BtnContainer,
  UserButton,
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

const Users: React.FC = () => {
  const [debts, setDebts] = useState<IDebts[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<IDebts>({} as IDebts);

  useEffect(() => {
    async function loadDebts() {
      const response = await api.get('debts');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setDebts(response.data.allDebts);
    }

    loadDebts();
  }, [currentPage, setPages, total]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  const handleRemove = useCallback(
    async (id: string): Promise<void> => {
      try {
        await api.delete(`/debts/${id}`);

        const filteredDebts = debts.filter(debt => debt.id !== id);

        setDebts(filteredDebts);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [debts],
  );

  function handleEdit(debt: IDebts): void {
    setEditingDebt(debt);

    toggleEditModal();
  }

  const handleAddDebt = useCallback(
  async (dataDebt: IDebts): Promise<void> => {
      console.log(dataDebt);
      try {
        const response = await api.post('/debts', dataDebt);

       setDebts([...debts, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [debts]);

 

  const handleDebt = useCallback(async (id: string) => {
    await api.patch(`/debts/${id}`);

    const response = await api.get('debts');

    alert('Dar baixa na conta: ' + id);

    setDebts(response.data.allDebts);
  }, []);

  return (
    <>
      <ModalAdd
        handleAddDebt={handleAddDebt}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingDebt={editingDebt}
        handleUpdateDebt={handleUpdateDebt}
      />

      <Container>
        <h3>Contas à Pagar</h3>

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
              <th>Baixa</th>
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
                <td>{moment(debt.data_emissao).format('DD/MM/YYYY')}</td>
                <td>{moment(debt.data_vencimento).format('DD/MM/YYYY')}</td>
                <td>{moment(debt.data_quitacao).format('DD/MM/YYYY')}</td>
                <td>{debt.status}</td>
                <td>{debt.obs}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(debt)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(debt.id)}>
                      <FiXCircle size={18} />
                    </UserButton>
                  </BtnContainer>
                </td>
                <td>
                  {debt.status === 'paga' ?
                    <p>OK</p>
                    :
                    <UserButton onClick={() => handleDebt(debt.id)}>
                      <FiArrowDownCircle size={18} />
                    </UserButton>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Content>

        <Pagination>
          {/* <div>Total: {total}</div> */}
          <Nav>
            {currentPage > 1 && (
              <Prev onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
              </Prev>
            )}
            {pages && pages.map(page => (
              <Item
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Item>
            ))}
            {currentPage < pages.length && (
              <Next onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Next>
            )}
          </Nav>
        </Pagination>
      </Container >
      <ButtonContainer>
        <NewUserButton onClick={toggleModal}>
          <FiPlusCircle size={24} />
        </NewUserButton>
      </ButtonContainer>
    </>
  );
};

export default Users;