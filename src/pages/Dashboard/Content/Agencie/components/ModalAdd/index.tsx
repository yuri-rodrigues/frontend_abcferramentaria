import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';


import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';
import { Form } from './styles';
import Select from '../../../../../../components/Input/Select';
import api from '../../../../../../services/api';

interface Bank {
  id: string;
  nome: string;
}

interface Agencie {
  id: string;
  bank_id: Bank;
  num_agencia: string;
  gerente: string;
  telefone1: string;
  telefone2: string;
  email: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAgencie: (data: Agencie) => void;
}

const ModalAdd: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAgencie,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    async function loadBanks() {
      const response = await api.get('/banks');

      setBanks(response.data);
    }

    loadBanks();
  }, []);

  const handleSubmit = useCallback(
    async ({ id, bank_id, num_agencia, gerente, email, telefone1, telefone2 }: Agencie) => {
      handleAddAgencie({
        id, bank_id, num_agencia, gerente, email, telefone1, telefone2
      });

      setIsOpen();
    },
    [handleAddAgencie, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Agência</h1>

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