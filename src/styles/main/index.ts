import { Image, Input, List } from '@chakra-ui/react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const MainListWrapper = styled.div`
  width: 34.375%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const YMapWrapper = styled.div`
  width: 65.625%;
  height: 100vh;
`;

export const StyledList = styled(List)`
  width: 30em;
  max-height: 72vh;
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
  width: 182px;
  height: auto;
  margin-top: 4vh;
`;

export const SearchInput = styled(Input)`
  width: 30em;
  height: 48px;
`;
