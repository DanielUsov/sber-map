import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPartnersQuery } from '../../__data__/services/api/partner';
import { MainList } from '../../components/main-list';
import { YMap } from '../../components/y-map';
import { Wrapper } from '../../styles/main';

export const MainPage = () => {
  const { data: partners, isError } = useGetPartnersQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError]);

  return (
    <Wrapper>
      <>
        <MainList data={partners!} />
        <YMap data={partners!} />
      </>
    </Wrapper>
  );
};
