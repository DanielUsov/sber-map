import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { partnersForMain as cards } from '../../__data__/smoke';
import {
  MainListWrapper,
  SberFullLogo,
  SearchInput,
  StyledList,
} from '../../styles/main';

export const MainList = () => {
  return (
    <MainListWrapper>
      <SberFullLogo src="/SBER-full-logo.svg" alt={'SBER logo'} />

      <Box
        h={'100%'}
        sx={{
          marginTop: '4rem',
        }}
      >
        <SearchInput
          placeholder={'Введите компанию партнера'}
          borderColor={'#7ECC81'}
          focusBorderColor={'#6cad6e'}
          borderRadius={'10px'}
        />
        <StyledList spacing={3}>
          {cards.map((card) => (
            <Card
              variant={'elevated'}
              size={'sm'}
              background={'#F0F6FE'}
              borderRadius={'10px'}
              _hover={{ bg: '#E5FFE4' }}
            >
              <CardHeader>{card.title}</CardHeader>
              <CardBody>
                {card.places.map((place) => (
                  <Text>{place.address}</Text>
                ))}
              </CardBody>
            </Card>
          ))}
        </StyledList>
      </Box>
    </MainListWrapper>
  );
};
