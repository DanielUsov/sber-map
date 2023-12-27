import { Spinner } from '@chakra-ui/react';
import { LoaderWrapper } from '../../styles/loader';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Spinner
        thickness="1vh"
        speed="0.65s"
        emptyColor="#ebebeb"
        color="#7ecc81"
        sx={{
          height: '15vh',
          width: '15vh',
        }}
      />
    </LoaderWrapper>
  );
};
