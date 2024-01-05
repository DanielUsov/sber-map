import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Highlight,
} from '@chakra-ui/react';
import { TPartner, TPlace } from '../../@types/partners';
import { useGetPartnerByIdQuery } from '../../__data__/services/api/partner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type ModelViewProps = {
  isOpen: any;
  onClose: any;
  PID?: string;
  currentData?: Pick<TPartner, Exclude<keyof TPartner, 'partnerId'>>;
};

export const ModelView = ({
  isOpen,
  onClose,
  PID = '',
  currentData,
}: ModelViewProps) => {
  const navigate = useNavigate();
  const { data: partnerData, isError } = useGetPartnerByIdQuery(PID || '');
  const partner =
    PID !== '' && typeof currentData === 'undefined'
      ? partnerData
      : currentData;

  useEffect(() => {
    if (isError && typeof currentData === 'undefined') {
      navigate('/error');
      console.log('error');
    }
  }, [isError]);

  return (
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
            <Text
              key={place.coordinates.latitude + place.coordinates.longitude}
              fontSize="16"
            >
              {place.address}
            </Text>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
