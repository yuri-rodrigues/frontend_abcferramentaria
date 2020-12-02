import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #dee2e6!important;

  box-sizing: border-box;

  background-color: #f8f9fa!important;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;

  svg{
    :hover{
      opacity: 0.6;
   }
  } 
`;


export const LogOutButton = styled.button`
  font-family: Courier New, monospace;
  font-weight: bold;
  color: #fff;
  background-color: #A8262F;
    
  border: 2px solid #A70000;

  padding: 5px 20px;
   
  height: 45px;
  width: 100px;

  :hover{
    opacity: 0.6;
  }
`;