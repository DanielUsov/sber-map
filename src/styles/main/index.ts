import { Image, Input, List } from '@chakra-ui/react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const MainListWrapper = styled.div`
  width: 35%;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const YMapWrapper = styled.div`
  width: 65%;
  height: 100vh;
`;

export const StyledList = styled(List)`
  width: 100%;
  max-height: 70%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
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
  padding: 0 0.2em 0em 0em;
  margin-top: 2rem;
`;

export const SberFullLogo = styled(Image)`
  width: 77px;
  height: 84px;
  margin-top: 4vh;
`;

export const SearchInput = styled(Input)`
  width: 30%;
  height: 48px;
`;
