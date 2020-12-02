import React, { useCallback, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi'
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

interface Agencie {
  id: string;
  num_agencia: string;
  gerente: string;
  telefone1: string;
  telefone2: string;
  email: string;
}

interface BankAccount {
  id: string;
  agencie_id: Agencie;
  num_account: number;
  balance: number;
}

const Users: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBankAccount, setEditingBankAccount] = useState<BankAccount>({} as BankAccount);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('bank-accounts');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setBankAccounts(response.data);
    }

    loadUsers();
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
        await api.delete(`/bank-accounts/${id}`);

        const filteredBankAccounts = bankAccounts.filter(bankAccount => bankAccount.id !== id);

        setBankAccounts(filteredBankAccounts);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [bankAccounts],
  );

  function handleEdit(user: BankAccount): void {
    setEditingBankAccount(user);

    toggleEditModal();
  }

  const handleAddBankAccount = useCallback(
    async (dataBankAccount: BankAccount): Promise<void> => {
      try {
        const response = await api.post('/bank-accounts', dataBankAccount);

        setBankAccounts([...bankAccounts, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [bankAccounts]);

  const handleUpdateBankAccount = useCallback(
    async (dataBankAccount: BankAccount): Promise<void> => {
      try {
        const userList = bankAccounts.map(bankAccount => {
          if (bankAccount.id !== editingBankAccount.id) {
            return bankAccount;
          }

          return {
            ...bankAccount,
            id: dataBankAccount.id,
          };
        });

        setBankAccounts(userList);

        const response = await api.put(`/bank-accounts/${editingBankAccount.id}`, dataBankAccount);

        setBankAccounts([response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [editingBankAccount, bankAccounts],
  );


  return (
    <>
      <ModalAdd
        handleAddBankAccount={handleAddBankAccount}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingBankAccount={editingBankAccount}
        handleUpdateBankAccount={handleUpdateBankAccount}
      />

      <Container>
        <h3>Contas Bancárias</h3>

        <Content>
          <thead>
            <tr>
              <th>Número da Agencia</th>
              <th>Número da Conta</th>
              <th>Saldo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts && bankAccounts.map(bankAccount => (
              <tr key={bankAccount.id}>
                <td>{bankAccount.agencie_id.num_agencia}</td>
                <td>{bankAccount.num_account}</td>
                <td>{bankAccount.balance}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(bankAccount)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(bankAccount.id)}>
                      <FiXCircle size={18} />
                    </UserButton>
                  </BtnContainer>
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