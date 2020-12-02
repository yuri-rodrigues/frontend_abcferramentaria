import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 18px;

  button{
    margin: 50px;
    width: 400px;
    height: 50px;

    border: 2px solid #A70000;

    color: #fff;

    background-color: #A8262F;

    align-items: center;
    justify-content: center;

    :hover{
      opacity: 0.6;
    }
  }

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