import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';
import api from '../../../../../../services/api';

interface Supplier {
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
  handleAddSupplier: (data: Supplier) => void;
}

const ModalAddSupplier: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddSupplier,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const handleSubmit = useCallback(
    async ({ id, cnpj, inscr_estadual, nome, nome_fantasia, razaosocial, obs }: Supplier) => {

      handleAddSupplier({
        id,
        cnpj,
        inscr_estadual,
        nome,
        nome_fantasia,
        razaosocial,
        obs
      });

      setIsOpen();
    },
    [handleAddSupplier, setIsOpen],
  );


  useEffect(() => {

    async function loadSuppliers(): Promise<void> {
      const response = await api.get('/suppliers');

      setSuppliers(response.data);
    }

    loadSuppliers();
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Fornecedor</h1>

        <Input name="cnpj" type="text" placeholder="CNPJ" />
        <Input name="inscr_estadual" type="text" placeholder="Inscrição Estadual" />
        <Input name="nome" type="text" placeholder="Nome" />
        <Input name="nome_fantasia" type="text" placeholder="Nome Fantasia" />
        <Input name="razaosocial" type="text" placeholder="Razão Social" />
        <Input name="obs" type="text" placeholder="Observação" />

        <button type="submit">
          <p className="text">Adicionar Fornecedor</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddSupplier;