/* eslint-disable camelcase */
import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';

interface IUpdateSupplierData {
  id: string;
  cnpj: string;
  nome_fantasia: string;
  razaosocial: string;
  inscr_estadual: string;
  nome: string;
  obs: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateSupplier: (supplier: IUpdateSupplierData) => void;
  editingSupplier: IUpdateSupplierData;
}

const ModalEditUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateSupplier,
  editingSupplier,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (supplier: IUpdateSupplierData) => {
      handleUpdateSupplier(supplier);

      setIsOpen();
    },
    [handleUpdateSupplier, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingSupplier}>
        <h1>Editar Fornecedor</h1>

        <Input name="cnpj" type="text" placeholder="CNPJ" />
        <Input name="inscr_estadual" type="text" placeholder="Inscrição Estadual" />
        <Input name="nome" type="text" placeholder="Nome" />
        <Input name="nome_fantasia" type="text" placeholder="Nome Fantasia" />
        <Input name="razaosocial" type="text" placeholder="Razão Social" />
        <Input name="obs" type="text" placeholder="Observação" />


        <button type="submit">
          <p className="text">Editar Fornecedor</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;