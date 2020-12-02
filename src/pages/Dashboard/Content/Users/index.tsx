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

interface IUsers {
  id: string;
  matricula: string;
  funcao: string;
  nome: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUsers>({} as IUsers);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setUsers(response.data);
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
        await api.delete(`/users/${id}`);

        const filteredUsers = users.filter(user => user.id !== id);

        setUsers(filteredUsers);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [users],
  );

  function handleEdit(user: IUsers): void {
    setEditingUser(user);

    toggleEditModal();
  }

  const handleAddUser = useCallback(
    async (dataUser: IUsers): Promise<void> => {
      try {
        const response = await api.post('/users', dataUser);

        setUsers([...users, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [users]);

  const handleUpdateUser = useCallback(
    async (dataUser: IUsers): Promise<void> => {
      try {
        const userList = users.map(user => {
          if (user.id !== editingUser.id) {
            return user;
          }

          return {
            ...user,
            id: dataUser.id,
          };
        });

        setUsers(userList);

        const response = await api.put(`/users/${editingUser.id}`, dataUser);

        setUsers([response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [editingUser, users],
  );


  return (
    <>
      <ModalAdd
        handleAddUser={handleAddUser}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingUser={editingUser}
        handleUpdateUser={handleUpdateUser}
      />

      <Container>
        <h3>Usuários</h3>

        <Content>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Função</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.email}>
                <td>{user.matricula}</td>
                <td>{user.funcao}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(user)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(user.id)}>
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