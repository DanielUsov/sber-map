import { FormControl, chakra } from '@chakra-ui/react';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const LoginForm = chakra(FormControl, {
  baseStyle: {
    width: '20%',
    backgroundColor: '#f0f6fe',
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.20)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
