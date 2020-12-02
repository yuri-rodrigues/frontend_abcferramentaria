import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 18px;

  h3{
    font-size: 22px;
    font-weight: bold;
    color: #A70000;
  }
`;

export const Content = styled.table`
  border-collapse: collapse;
  min-width: 900px;
  
  th {
    padding: 10px;
    text-align: center;
    background: #A8262F;
  }
  tbody {
    color: #313131;
    width: 100%;

    tr{
      text-align: center;
      border-bottom: 1px solid #A8262F;

      td{
        padding: 10px;
      }
    }
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const UserButton = styled.button`
  border: 2px solid #A70000;
  border-radius: 50%;

  height: 35px;
  width: 35px;

  color: #fff;

  background-color: #A8262F;

  align-items: center;
  justify-content: center;

  :hover{
    opacity: 0.6;
  }
`;

export const Pagination = styled.div`
  display: flex;
  min-width: 885px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background: #A8262F;
  font-weight: bold;
`;

export const Nav = styled.ul`
  display: flex;
  list-style: none;
`;

export const Item = styled.button`
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
`;

export const Prev = styled.button``;

export const Next = styled.button``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 20px;
`;

export const NewUserButton = styled.button`
  border: 2px solid #A70000;
  border-radius: 50%;

  height: 45px;
  width: 45px;

  font-family: Courier New, monospace;
  font-weight: bold;
  color: #fff;

  background-color: #A8262F;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
    opacity: 0.6;
  }
`;