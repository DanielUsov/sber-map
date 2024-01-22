import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Link as ChakraLink,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { TPartner, TPlace } from '../../@types/partners';
import { useGetPartnerByIdQuery } from '../../__data__/services/api/partner';
import {
  MainListWrapper,
  SberFullLogo,
  SearchInput,
  StyledList,
} from '../../styles/main';
import { ModelView } from '../modal-view/inex';

type TMainListProps = {
  data: TPartner[];
};

export const MainList = ({ data: partners }: TMainListProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [PID, setPID] = useState('null');
  const [partnerToMV, setPartnerToMV] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: partner, refetch: refetchPartner } =
    useGetPartnerByIdQuery(PID);

  const navigate = useNavigate();

  const handleClick = async (data: TPartner) => {
    await setPID(data.partnerId);
    await refetchPartner()
      .unwrap()
      .then((PartnerById) => {
        setPartnerToMV(PartnerById);
      });
    onOpen();
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };

  const filteredPartner: TPartner[] =
    searchValue !== '' && typeof partners !== 'undefined'
      ? partners.filter((partner) => partner.title.includes(searchValue))
      : partners || [];

  return (
    <MainListWrapper>
      <SberFullLogo src="/SBER-KIB-logo.svg" alt={'SBER logo'} />
      <Box
        h={'80%'}
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
          formNoValidate
        />
        <StyledList spacing={3}>
          {filteredPartner.map((card: any) => (
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
                {card.places.map((place: TPlace) => (
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
        <div style={{ marginTop: '0.6vh' }}>
          <ChakraLink as={ReactRouterLink} to="/admin">
            <Text color={'#9A9A9A'} fontSize="10">
              Вы администратор? Перейдите в панель администратора
            </Text>
          </ChakraLink>
        </div>
      </Box>
      {Object.keys(partnerToMV).length > 0 ? (
        <ModelView
          isOpen={isOpen}
          onClose={onClose}
          data={partnerToMV as TPartner}
        />
      ) : null}
    </MainListWrapper>
  );
};
