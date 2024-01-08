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
import { useEffect, useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import { TPartner } from '../../@types/partners';
import { useGetPartnersQuery } from '../../__data__/services/api/partner';
import { ModelView } from '../../components/modal-view/inex';
import {
  AdminAllPartnersWrapper,
  AllPartnersTable,
  AllPartnersTableContainer,
} from '../../styles/admin';

export const AllPartners = () => {
  const [searchValue, setSearchValue] = useState('');
  const [PID, setPID] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { data: partners, isError, refetch } = useGetPartnersQuery();

  console.log(partners);

  const handleClick = (dataL: TPartner) => {
    onOpen();
    setPID(dataL.partnerId);
  };

  const handleEdit = (e: any, dataL: TPartner) => {
    e.stopPropagation();
    navigate(`/admin/partner/${dataL.partnerId}/0`);
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleExit = (event: any) => {};

  const handleCreate = () => {
    navigate(`/admin/newPartner/0`);
  };

  useEffect(() => {
    refetch();
  }, []);

  const filteredPartner: TPartner[] =
    searchValue !== ''
      ? partners?.filter((partner) => partner.title.includes(searchValue))
      : partners;

  return (
    <>
      {isError ? <Navigate to="/error" /> : null}
      {partners && filteredPartner && (
        <>
          <Button
            width={'6rem'}
            height={'2rem'}
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
                formNoValidate
              />
              <AllPartnersTableContainer
                maxHeight="90%"
                overflowY="auto"
                marginTop={'2vh'}
              >
                <AllPartnersTable background={'#F0F6FE'}>
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
            {/* <ModelView isOpen={isOpen} onClose={onClose} PID={PID} isForm /> */}
            {Object.keys(partners).length > 0 ? (
              <ModelView isOpen={isOpen} onClose={onClose} data={partners} />
            ) : null}
          </AdminAllPartnersWrapper>
          <Button
            width={'14rem'}
            height={'2rem'}
            color="white"
            float={'right'}
            marginRight={'8px'}
            marginTop={'18vh'}
            bg={'#21a038'}
            _hover={{ bg: '#21a038' }}
            onClick={handleCreate}
            rightIcon={<IoCreateOutline />}
          >
            Добавить партнера
          </Button>
        </>
      )}
    </>
  );
};
