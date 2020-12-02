/* eslint-disable camelcase */
import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';

interface IUpdateAccountGroupData {
  id: string;
  nome: string;
  descricao: string;
  obs: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAccountGroup: (accountGroup: IUpdateAccountGroupData) => void;
  editingAccountGroup: IUpdateAccountGroupData;
}

const ModalEditAccountGroup: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateAccountGroup,
  editingAccountGroup,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (accountGroup: IUpdateAccountGroupData) => {
      handleUpdateAccountGroup(accountGroup);

      setIsOpen();
    },
    [handleUpdateAccountGroup, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAccountGroup}>
        <h1>Editar Grupo de Contas</h1>

        <Input name="nome" placeholder="NOME DO GRUPO DE CONTAS" />
        <Input name="descricao" placeholder="DESCRIÇÃO" />
        <Input name="obs" placeholder="OBSERVAÇÃO" />

        <button type="submit">
          <p className="text">Editar Grupo de Contas</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAccountGroup;