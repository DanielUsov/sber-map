import {
  Highlight,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TPartner, TPlace } from '../../@types/partners';
import { useGetPartnerByIdQuery } from '../../__data__/services/api/partner';

export type ModelViewProps = {
  isOpen: any;
  onClose: any;
  PID?: string;
  currentData?: Pick<TPartner, Exclude<keyof TPartner, 'partnerId'>>;
  isForm?: boolean;
};

export const ModelView = ({
  isOpen,
  onClose,
  PID = '',
  currentData,
  isForm = false,
}: ModelViewProps) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { data: partnerData, isError } = useGetPartnerByIdQuery(PID || '');
  const partner =
    PID !== '' && typeof currentData === 'undefined'
      ? partnerData
      : currentData;

  const handlerDeletePlace = () => {};

  const disabledView = () => (isOpen = false);

  useEffect(() => {
    if (isError && typeof currentData === 'undefined') {
      disabledView();
      onClose();
      setError(true);
      // navigate('/error');
    }
  }, [isError]);

  return (
    <>
      {!error ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Highlight
                  query={partner?.title ? partner.title : 'названия нет'}
                  styles={{ px: '2', py: '1', rounded: 'full', bg: '#E5FFE4' }}
                >
                  {partner?.title ? partner.title : 'названия нет'}
                </Highlight>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="18">Условия предоставления скидки:</Text>
                {partner?.conditions && partner?.conditions.length > 0 ? (
                  partner?.conditions.map((condition, index) => (
                    <Text fontSize="16">{`${index + 1}. ${condition} `}</Text>
                  ))
                ) : (
                  <Text fontSize="16">{'условий нет'}</Text>
                )}
                <Text fontSize="18" marginTop="12px">
                  Дополнительная информация:
                </Text>
                <Text fontSize="16">{partner?.additionalInfo}</Text>
                <Text fontSize="18" marginTop="12px">
                  Адреса:
                </Text>
                {partner?.places.map((place: TPlace) => (
                  <div style={{ display: 'flex' }}>
                    <Text
                      key={
                        place.coordinates.latitude + place.coordinates.longitude
                      }
                      fontSize="16"
                    >
                      {place.address}
                    </Text>
                    {isForm ? (
                      <IconButton
                        marginLeft={'10px'}
                        width={'10px'}
                        height={'24px'}
                        _hover={{ bg: '#21A038' }}
                        bg={'#F0F6FE'}
                        aria-label={'Редактировать'}
                        onClick={handlerDeletePlace}
                      >
                        <MdDelete />
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
};
