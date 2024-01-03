import { Table, TableContainer } from '@chakra-ui/react';
import styled from 'styled-components';

export const AdminAllPartnersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100vw;
`;

export const AllPartnersTableContainer = styled(TableContainer)`
  border-radius: 10px 0 0 10px;
  height: 100vh;
  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 0 10px 10px 0;
    background-color: #f0f6fe;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #7ecc81;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7ecc81;
  }
`;

export const AllPartnersTable = styled(Table)`
  /* height: 30vh */
  max-height: 100px;
  overflow-y: auto;
`;
