/* eslint-disable camelcase */
import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';

import { Form } from './styles';
import api from '../../../../../../services/api';
import Select from '../../../../../../components/Input/Select';

interface Agencie {
  id: string;
  num_agencia: string;
  gerente: string;
  telefone1: string;
  telefone2: string;
  email: string;
}

interface BankAccount {
  id: string;
  agencie_id: Agencie;
  num_account: number;
  balance: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateBankAccount: (bankAccount: BankAccount) => void;
  editingBankAccount: BankAccount;
}

const ModalEditBankAccount: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateBankAccount,
  editingBankAccount,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [agencies, setAgencies] = useState<Agencie[]>([]);

  const handleSubmit = useCallback(
    async (bankAccount: BankAccount) => {
      handleUpdateBankAccount(bankAccount);

      setIsOpen();
    },
    [handleUpdateBankAccount, setIsOpen],
  );

  useEffect(() => {
    async function loadAgencie(): Promise<void> {
      const response = await api.get('/agencies');

      setAgencies(response.data);
    }

    loadAgencie();
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingBankAccount}>
        <h1>Editar Conta Bancaria</h1>

        <Select name="agencie_id" type="select">
          <option value="0">Escolha a agência</option>
          {agencies && agencies.map(agencie => (
            <option value={agencie.id} key={agencie.id}>{agencie.num_agencia}</option>
          ))}
        </Select>

        <Input name="agencie_id" type="text" placeholder="Numero da Conta" />
        <Input name="gerente" type="text" placeholder="Saldo" />

        <button type="submit">
          <p className="text">Editar Conta Bancaria</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditBankAccount;