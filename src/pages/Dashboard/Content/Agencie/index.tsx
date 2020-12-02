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

interface IBank {
  id: string;
  nome: string;
}

interface Agencie {
  id: string;
  bank_id: IBank;
  num_agencia: string;
  gerente: string;
  telefone1: string;
  telefone2: string;
  email: string;
}

const Agencies: React.FC = () => {
  const [agencies, setAgencies] = useState<Agencie[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAgencie, setEditingAgencie] = useState<Agencie>({} as Agencie);

  useEffect(() => {
    async function loadAgencies() {
      const response = await api.get('agencies');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setAgencies(response.data);
    }

    loadAgencies();
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
        await api.delete(`/agencies/${id}`);

        const filteredAgencies = agencies.filter(agencies => agencies.id !== id);

        setAgencies(filteredAgencies);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [agencies],
  );

  function handleEdit(agencie: Agencie): void {
    setEditingAgencie(agencie);

    toggleEditModal();
  }

  const handleAddAgencie = useCallback(
    async (dataAgencie: Agencie): Promise<void> => {
      try {
        const response = await api.post('/agencies', dataAgencie);

        setAgencies([...agencies, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [agencies]);

  const handleUpdateAgencie = useCallback(
    async (dataAgencie: Agencie): Promise<void> => {
      try {
        const agencieList = agencies.map(agencie => {
          if (agencie.id !== editingAgencie.id) {
            return agencie;
          }

          return {
            ...agencie,
            id: dataAgencie.id,
          };
        });

        setAgencies(agencieList);

        const response = await api.put(`/bank-accounts/${editingAgencie.id}`, dataAgencie);

        setAgencies([response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [editingAgencie, agencies],
  );


  return (
    <>
      <ModalAdd
        handleAddAgencie={handleAddAgencie}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingAgencie={editingAgencie}
        handleUpdateAgencie={handleUpdateAgencie}
      />

      <Container>
        <h3>Agências</h3>

        <Content>
          <thead>
            <tr>
              <th>Banco</th>
              <th>Número da Agencia</th>
              <th>Gerente</th>
              <th>Telefone 1</th>
              <th>Telefone 2</th>
              <th>E-mail</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {agencies && agencies.map(agencie => (
              <tr key={agencie.id}>
                <td>{agencie.bank_id.nome}</td>
                <td>{agencie.num_agencia}</td>
                <td>{agencie.gerente}</td>
                <td>{agencie.telefone1}</td>
                <td>{agencie.telefone2}</td>
                <td>{agencie.email}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(agencie)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(agencie.id)}>
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

export default Agencies;