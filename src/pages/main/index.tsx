import { MainList } from '../../components/main-list';
import { YMap } from '../../components/y-map';
import { Wrapper } from '../../styles/main';

export const MainPage = () => {
  return (
    <Wrapper>
      <MainList />
      <YMap />
    </Wrapper>
  );
};
