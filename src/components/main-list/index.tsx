import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TPartnersWithPlacemarks, TPlaces } from '../../@types/partners';
import { partnersForMain as cards } from '../../__data__/smoke';
import {
  MainListWrapper,
  SberFullLogo,
  SearchInput,
  StyledList,
} from '../../styles/main';
import { ModelView } from '../modal-view/inex';

export const MainList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [PID, setPID] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (data: TPartnersWithPlacemarks) => {
    onOpen();
    setPID(data.partnerId);
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };

  const filteredCards: TPartnersWithPlacemarks[] =
    searchValue !== ''
      ? cards.filter((card) => card.title.includes(searchValue))
      : cards;

  return (
    <MainListWrapper>
      <SberFullLogo src="/SBER-KIB-logo.svg" alt={'SBER logo'} />
      <Box
        h={'100%'}
        sx={{
          marginTop: '4rem',
        }}
      >
        <SearchInput
          value={searchValue}
          onChange={handleSearch}
          placeholder={'Введите компанию партнера'}
          borderColor={'#7ECC81'}
          focusBorderColor={'#6cad6e'}
          borderRadius={'10px'}
        />
        <StyledList spacing={3}>
          {filteredCards.map((card: TPartnersWithPlacemarks) => (
            <Card
              variant={'elevated'}
              size={'sm'}
              background={'#F0F6FE'}
              borderRadius={'10px'}
              _hover={{ bg: '#E5FFE4' }}
              onClick={() => handleClick(card)}
            >
              <CardHeader>
                <Text fontSize="18">{card.title}</Text>
              </CardHeader>
              <CardBody>
                {card.places.map((place: TPlaces) => (
                  <Text
                    key={
                      place.coordinates.latitude + place.coordinates.longitude
                    }
                    fontSize="16"
                  >
                    {place.address}
                  </Text>
                ))}
              </CardBody>
            </Card>
          ))}
        </StyledList>
      </Box>
      <ModelView isOpen={isOpen} onClose={onClose} PID={PID} />
    </MainListWrapper>
  );
};
