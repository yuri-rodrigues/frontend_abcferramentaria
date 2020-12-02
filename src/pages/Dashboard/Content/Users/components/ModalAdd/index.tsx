import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';


import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';
import { Form } from './styles';

export interface ICreateUserData {
  id: string;
  matricula: string;
  funcao: string;
  nome: string;
  email: string;
  password: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddUser: (data: ICreateUserData) => void;
}

const ModalAddUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddUser,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ id, matricula, funcao, nome, email, password }: ICreateUserData) => {
      handleAddUser({
        id, matricula, funcao, nome, email, password
      });

      setIsOpen();
    },
    [handleAddUser, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Usuário</h1>

        <Input name="matricula" type="text" placeholder="Ex: XXX-X" />
        <Input name="funcao" type="text" placeholder="Ex: A, B ou C" />
        <Input name="nome" type="text" placeholder="Ex: Yuri Rodrigues" />
        <Input name="email" type="text" placeholder="Ex: cezarcozta@gmail.com" />
        <Input name="password" type="text" placeholder="Ex: ******" />

        <button type="submit">
          <p className="text">Adicionar Usuário</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddUser;