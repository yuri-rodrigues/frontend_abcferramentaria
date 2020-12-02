import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';


import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';
import { Form } from './styles';

interface AccountGroup {
  id: string;
  nome: string;
  descricao: string;
  obs: string;
}


interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAccountGroup: (data: AccountGroup) => void;
}

const ModalAdd: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAccountGroup,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ id, nome, descricao, obs }: AccountGroup) => {
      handleAddAccountGroup({
        id, nome, descricao, obs
      });

      setIsOpen();
    },
    [handleAddAccountGroup, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Usuário</h1>

        <Input name="nome" type="text" placeholder="Nome" />
        <Input name="descricao" type="text" placeholder="Descricao" />
        <Input name="obs" type="text" placeholder="Observação" />

        <button type="submit">
          <p className="text">Adicionar Grupo de Conta</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAdd;