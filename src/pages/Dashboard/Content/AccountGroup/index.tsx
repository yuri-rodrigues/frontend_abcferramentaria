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

interface AccountGroup {
  id: string;
  nome: string;
  descricao: string;
  obs: string;
}

const AccountGroups: React.FC = () => {
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAccountGroups, setEditingAccountGroups] = useState<AccountGroup>({} as AccountGroup);

  useEffect(() => {
    async function loadAccountGroups() {
      const response = await api.get('account-groups');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setAccountGroups(response.data);
    }

    loadAccountGroups();
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
        await api.delete(`/account-groups/${id}`);

        const filteredAccountGroups = accountGroups.filter(accountGroup => accountGroup.id !== id);

        setAccountGroups(filteredAccountGroups);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [accountGroups],
  );

  function handleEdit(accountGroup: AccountGroup): void {
    setEditingAccountGroups(accountGroup);

    toggleEditModal();
  }

  const handleAddAccountGroup = useCallback(
    async (dataAccountGroup: AccountGroup): Promise<void> => {
      try {
        const response = await api.post('/account-groups', dataAccountGroup);

        setAccountGroups([...accountGroups, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [accountGroups]);

  const handleUpdateAccountGroup = useCallback(
    async (dataAccountGroup: AccountGroup): Promise<void> => {
      try {
        const userList = accountGroups.map(accountGroup => {
          if (accountGroup.id !== editingAccountGroups.id) {
            return accountGroup;
          }

          return {
            ...accountGroup,
            id: dataAccountGroup.id,
          };
        });

        setAccountGroups(userList);

        const response = await api.put(`/account-groups/${editingAccountGroups.id}`, dataAccountGroup);

        setAccountGroups([response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [editingAccountGroups, accountGroups],
  );


  return (
    <>
      <ModalAdd
        handleAddAccountGroup={handleAddAccountGroup}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingAccountGroup={editingAccountGroups}
        handleUpdateAccountGroup={handleUpdateAccountGroup}
      />

      <Container>
        <h3>Grupos de Contas</h3>

        <Content>
          <thead>
            <tr>
              <th>Nome do Grupo</th>
              <th>Descrição</th>
              <th>Observação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {accountGroups && accountGroups.map(accountGroup => (
              <tr key={accountGroup.id}>
                <td>{accountGroup.nome}</td>
                <td>{accountGroup.descricao}</td>
                <td>{accountGroup.obs}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(accountGroup)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(accountGroup.id)}>
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

export default AccountGroups;