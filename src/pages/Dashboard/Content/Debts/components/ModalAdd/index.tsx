import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../../../../../../components/Modal';
import Input from '../../../../../../components/Input';
import Select from '../../../../../../components/Input/Select';

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

interface AccountGroup {
  id: string;
  nome: string;
  descricao: string;
  obs: string;
}

interface BankAccount {
  id: string;
  num_account: number;
  balance: number;
}

interface IDebts {
  id: string;
  supplier_id: Supplier;
  account_group_id: AccountGroup;
  bank_account_id: BankAccount;
  value: number,
  juros: number,
  parcela: number,
  data_emissao: Date;
  data_vencimento: Date;
  data_quitacao: Date;
  status: 'paga' | 'vencida' | 'aberta',
  obs: string;
}
interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddDebt: (data: IDebts) => void;
}

const ModalAddDebt: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddDebt,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [groups, setGroups] = useState<AccountGroup[]>([]);

  const handleSubmit = useCallback(
    async ({ id, supplier_id, account_group_id, bank_account_id, value, juros, parcela, data_emissao, data_vencimento, data_quitacao, status, obs }: IDebts) => {

      handleAddDebt({
        id,
        supplier_id,
        account_group_id,
        bank_account_id,
        value,
        juros,
        parcela,
        data_emissao,
        data_vencimento,
        data_quitacao,
        status,
        obs
      });

      setIsOpen();
    },
    [handleAddDebt, setIsOpen],
  );


  useEffect(() => {
    async function loadAccounts(): Promise<void> {
      const response = await api.get('/bank-accounts');

      setAccounts(response.data);
    }

    async function loadGroups(): Promise<void> {
      const response = await api.get('/account-groups');

      setGroups(response.data);
    }

    async function loadSuppliers(): Promise<void> {
      const response = await api.get('/suppliers');

      setSuppliers(response.data);
    }

    loadAccounts();
    loadGroups();
    loadSuppliers();
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Conta à Pagar</h1>

        <Select name="supplier_id" type="select">
          <option value="0">Escolha o Fornecedor</option>
          {suppliers && suppliers.map(supplier => (
            <option key={supplier.id} value={String(supplier.id)}>
              {supplier.razaosocial}
            </option>
          ))}
        </Select>
        <Select name="account_group_id" type="select">
          <option value="0">Escolha o Grupo de Contas</option>
          {groups && groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.nome}
            </option>
          ))}
        </Select>

        <Select name="bank_account_id" type="select">
          <option value="0">Escolha a Conta Bancária</option>
          {accounts && accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.num_account}
            </option>
          ))}
        </Select>

        <Input name="value" type="number" placeholder="Valor" />
        <Input name="parcela" type="number" placeholder="Parcela" />
        <Input name="juros" type="number" placeholder="Juros" />
        <Input name="data_emissao" type="date" placeholder="Data de Emissão" />
        <Input name="data_vencimento" type="date" placeholder="Data de Vencimento" />
        <Input name="data_quitacao" type="date" placeholder="Data de Quitação" />

        <Select name="status" type="select">
          <option value="0">Selecione o Status</option>
          <option value="paga">Paga</option>
          <option value="vencida">Vancida</option>
          <option value="aberta">Aberta</option>
        </Select>
        <Input name="obs" type="text" placeholder="Observação" />

        <button type="submit">
          <p className="text">Adicionar Conta à Pagar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddDebt;