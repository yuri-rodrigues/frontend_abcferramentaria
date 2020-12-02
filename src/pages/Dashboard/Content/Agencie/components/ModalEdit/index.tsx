/* eslint-disable camelcase */
import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';
import api from '../../../../../../services/api';
import Select from '../../../../../../components/Input/Select';

interface IBank {
  id: string;
  nome: string;
}

interface IUpdateAgencieData {
  id: string;
  bank_id: IBank;
  num_agencia: string;
  gerente: string;
  telefone1: string;
  telefone2: string;
  email: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAgencie: (agencie: IUpdateAgencieData) => void;
  editingAgencie: IUpdateAgencieData;
}

const ModalEditAgencie: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateAgencie,
  editingAgencie,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [banks, setBanks] = useState<IBank[]>([]);

  const handleSubmit = useCallback(
    async (agencie: IUpdateAgencieData) => {
      handleUpdateAgencie(agencie);

      setIsOpen();
    },
    [handleUpdateAgencie, setIsOpen],
  );

  useEffect(() => {
    async function loadBanks(): Promise<void> {
      const response = await api.get('/banks');

      setBanks(response.data);
    }

    loadBanks();
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAgencie}>
        <h1>Editar Agência</h1>

        <Select name="bank_id" type="select">
          <option value="0">Escolha o banco</option>
          {banks && banks.map(bank => (
            <option value={bank.id} key={bank.id}>{bank.nome}</option>
          ))}
        </Select>

        <Input name="num_agencia" type="text" placeholder="AGÊNCIA" />
        <Input name="gerente" type="text" placeholder="GERENTE" />
        <Input name="email" type="text" placeholder="EMAIL" />
        <Input name="telefone1" type="text" placeholder="TELEFONE1" />
        <Input name="telefone2" type="text" placeholder="TELEFONE2" />

        <button type="submit">
          <p className="text">Editar Agência</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAgencie;