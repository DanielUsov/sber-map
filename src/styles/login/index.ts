import { FormControl } from '@chakra-ui/react';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const LoginForm = styled(FormControl)`
  width: 100px;
  height: 42vh;
  background-color: #f0f6fe;
  border-radius: 10px;
`;
