import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';


import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';
import { Form } from './styles';
import Select from '../../../../../../components/Input/Select';
import api from '../../../../../../services/api';

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
  handleAddBankAccount: (data: BankAccount) => void;
}

const ModalAdd: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddBankAccount,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [agencies, setAgencies] = useState<Agencie[]>([]);

  useEffect(() => {
    async function loadBanks() {
      const response = await api.get('/agencies');

      setAgencies(response.data);
    }

    loadBanks();
  }, []);

  const handleSubmit = useCallback(
    async ({ id, agencie_id, num_account, balance }: BankAccount) => {
      handleAddBankAccount({
        id, agencie_id, num_account, balance
      });

      setIsOpen();
    },
    [handleAddBankAccount, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Conta Bancária</h1>

        <Select name="agencie_id" type="select">
          <option value="0">Escolha a Agência</option>
          {agencies && agencies.map(agencie => (
            <option value={agencie.id} key={agencie.id}>{agencie.num_agencia}</option>
          ))}
        </Select>

        <Input name="num_account" type="number" placeholder="NÚMERO DA CONTA" />
        <Input name="balance" type="number" placeholder="SALDO" />

        <button type="submit">
          <p className="text">Adicionar Conta Bancária</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAdd;