/* eslint-disable camelcase */
import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';

interface IUpdateUserData {
  id: string;
  matricula: string;
  funcao: string;
  nome: string;
  email: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateUser: (user: IUpdateUserData) => void;
  editingUser: IUpdateUserData;
}

const ModalEditUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateUser,
  editingUser,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (user: IUpdateUserData) => {
      handleUpdateUser(user);

      setIsOpen();
    },
    [handleUpdateUser, setIsOpen],
  );

  // useEffect(() => {
  //   async function loadFoodTypes(): Promise<void> {
  //     const response = await api.get('/foods');

  //     setFoodType(response.data);
  //   }

  //   loadFoodTypes();
  // }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingUser}>
        <h1>Editar Usuário</h1>

        <Input name="matricula" placeholder="MATRICULA" />
        <Input name="funcao" placeholder="FUNÇÃO" />
        <Input name="nome" placeholder="NOME" />
        <Input name="email" placeholder="EMAIL" />

        <button type="submit">
          <p className="text">Editar Usuário</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;