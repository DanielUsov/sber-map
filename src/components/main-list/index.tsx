import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import {
  MainListWrapper,
  SberFullLogo,
  SearchInput,
  StyledList,
} from '../../styles/main';

type TPlaces = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

type TCard = {
  partnerId: string;
  title: string;
  places: TPlaces[];
};

const cards: TCard[] = [
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAO>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017215,
          longitude: 39.7251289,
        },
      },
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAA>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAO>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017215,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAA>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAO>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017215,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAA>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAO>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017215,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAA>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAO>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017215,
          longitude: 39.7251289,
        },
      },
    ],
  },
  {
    partnerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'OAO <OAA>',
    places: [
      {
        address: 'г.Сочи ул.Пушкина д.Колотушкина',
        coordinates: {
          latitude: 43.6017218,
          longitude: 39.7251289,
        },
      },
    ],
  },
];

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
