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

interface Supplier {
  id: string;
  cnpj: string;
  nome_fantasia: string;
  razaosocial: string;
  inscr_estadual: string;
  nome: string;
  obs: string;
}

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier>({} as Supplier);

  useEffect(() => {
    async function loadSuppliers() {
      const response = await api.get('suppliers');

      setTotal(response.data.count);

      const totalPages = Math.ceil(total / response.data.length);

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setSuppliers(response.data);
    }

    loadSuppliers();
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
        await api.delete(`/suppliers/${id}`);

        const filteredSuppliers = suppliers.filter(supplier => supplier.id !== id);

        setSuppliers(filteredSuppliers);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [suppliers],
  );

  function handleEdit(supplier: Supplier): void {
    setEditingSupplier(supplier);

    toggleEditModal();
  }

  const handleAddSupplier = useCallback(
    async (dataSupplier: Supplier): Promise<void> => {
      try {
        const response = await api.post('/suppliers', dataSupplier);

        setSuppliers([...suppliers, response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    }, [suppliers]);

  const handleUpdateSupplier = useCallback(
    async (dataSupplier: Supplier): Promise<void> => {
      try {
        const supplierList = suppliers.map(supplier => {
          if (supplier.id !== editingSupplier.id) {
            return supplier;
          }

          return {
            ...supplier,
            id: dataSupplier.id,
          };
        });

        setSuppliers(supplierList);

        const response = await api.put(`/users/${editingSupplier.id}`, dataSupplier);

        setSuppliers([response.data]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [editingSupplier, suppliers],
  );


  return (
    <>
      <ModalAdd
        handleAddSupplier={handleAddSupplier}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />

      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingSupplier={editingSupplier}
        handleUpdateSupplier={handleUpdateSupplier}
      />

      <Container>
        <h3>Fornecedores</h3>

        <Content>
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Inscrição Estadual</th>
              <th>Nome</th>
              <th>Nome Fantasia</th>
              <th>Razão Social</th>
              <th>Observação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {suppliers && suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.cnpj}</td>
                <td>{supplier.inscr_estadual}</td>
                <td>{supplier.nome}</td>
                <td>{supplier.nome_fantasia}</td>
                <td>{supplier.razaosocial}</td>
                <td>{supplier.obs}</td>
                <td>
                  <BtnContainer>
                    <UserButton onClick={() => handleEdit(supplier)}>
                      <FiEdit size={18} />
                    </UserButton>
                    <UserButton onClick={() => handleRemove(supplier.id)}>
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

export default Suppliers;