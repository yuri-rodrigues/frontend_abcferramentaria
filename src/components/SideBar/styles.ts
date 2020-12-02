import styled from 'styled-components';

import { Link } from 'react-router-dom';

interface IProps {
  visible: boolean;
}

export const LinkComponent = styled(Link)`
  text-decoration: none;

  color: #495057;
`;

export const Container = styled.aside<IProps>`
  border-right: 1px solid #dee2e6!important;

  background-color: #f8f9fa!important;
  
  box-sizing: border-box;

  margin-left: ${(props) => props.visible ? '-300px' : '0'}; 
`;

export const Logo = styled.img`
  width: 15rem;

  padding: 10px;
`;

export const MenuContainer = styled.nav`
  width: 300px;
`;

export const MenuList = styled.ul`
  list-style: none;
`;

export const MenuItem = styled.li`
  margin: 30px 35px 30px 0;

  border-bottom: 1px solid #dee2e6!important;

  font-family: Courier New, monospace;
  font-size: 20px;

  cursor: pointer;

  :hover{
    opacity: 0.6;
  }
`;