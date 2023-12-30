import {
  Button,
  IconButton,
  Input,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TPartnersWithPlacemarks } from '../../@types/partners';
import { partnersForMain as partners } from '../../__data__/smoke';
import { ModelView } from '../../components/modal-view/inex';
import {
  AdminAllPartnersWrapper,
  AllPartnersTable,
  AllPartnersTableContainer,
} from '../../styles/admin';

export const AdminAllPartners = () => {
  const [searchValue, setSearchValue] = useState('');
  const [PID, setPID] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = (data: TPartnersWithPlacemarks) => {
    onOpen();
    setPID(data.partnerId);
  };

  const handleEdit = (e: any, data: TPartnersWithPlacemarks) => {
    e.stopPropagation();
    navigate(`/admin/partneredit/${data.partnerId}`);
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleExit = (event: any) => {};

  const handleCreate = () => {};

  const filteredPartner: TPartnersWithPlacemarks[] =
    searchValue !== ''
      ? partners.filter((partner) => partner.title.includes(searchValue))
      : partners;

  return (
    <>
      <Button
        width={'6vh'}
        height={'3vh'}
        color="white"
        marginTop={'20px'}
        float={'right'}
        marginRight={'8px'}
        bg={'#21a038'}
        _hover={{ bg: '#21a038' }}
        onClick={(e) => handleExit(e)}
      >
        Выход
      </Button>
      <AdminAllPartnersWrapper>
        <div
          style={{
            width: '124vh',
            height: '56vh',
            border: '2px solid',
            borderColor: '#21a038',
            borderRadius: '10px',
            padding: '4vh',
          }}
        >
          <Input
            value={searchValue}
            onChange={handleSearch}
            placeholder={'Введите компанию партнера'}
            borderColor={'#7ECC81'}
            focusBorderColor={'#6cad6e'}
            borderRadius={'10px'}
          />
          <AllPartnersTableContainer
            maxHeight="90%"
            overflowY="auto"
            marginTop={'2vh'}
          >
            <AllPartnersTable size={'lg'} background={'#F0F6FE'}>
              <Thead>
                <Tr>
                  <Th>Название компании партнера:</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPartner.flatMap((partner) => (
                  <Tr
                    background={'#F0F6FE'}
                    _hover={{ bg: '#E5FFE4' }}
                    onClick={() => handleClick(partner)}
                  >
                    <Td fontSize={16}>{partner.title}</Td>
                    <Td width={'81px'}>
                      <IconButton
                        _hover={{ bg: '#21A038' }}
                        bg={'#F0F6FE'}
                        aria-label={'Редактировать'}
                        onClick={(e) => handleEdit(e, partner)}
                      >
                        <MdOutlineEdit />
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </AllPartnersTable>
          </AllPartnersTableContainer>
        </div>
        <ModelView isOpen={isOpen} onClose={onClose} PID={PID} />
      </AdminAllPartnersWrapper>
      <Button
        width={'16vh'}
        height={'3vh'}
        color="white"
        float={'right'}
        marginRight={'8px'}
        bg={'#21a038'}
        _hover={{ bg: '#21a038' }}
        onClick={handleCreate}
        rightIcon={<IoCreateOutline />}
      >
        Добавить партнера
      </Button>
    </>
  );
};
