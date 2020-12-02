import React from 'react';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, LogOutButton } from './styles';

interface IProps {
  open: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<IProps> = ({ toggleMenu, open }) => {
  const { signOut } = useAuth();

  return (
    <Container>
      {open && open ?
        <FiArrowRightCircle size={50} color="darkred" onClick={toggleMenu} />
        : <FiArrowLeftCircle size={50} color="darkred" onClick={toggleMenu} />
      }
      <LogOutButton onClick={signOut}>Logout</LogOutButton>
    </Container>
  );
};

export default Header