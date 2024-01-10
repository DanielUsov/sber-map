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
import { MdDelete } from 'react-icons/md';
import { TPartner, TPlace } from '../../@types/partners';
import { useDispatch } from 'react-redux';
import { setPlaces } from '../../__data__/slices/edit-partner';

export type ModelViewProps = {
  isOpen: any;
  onClose: any;
  data?: TPartner | Pick<TPartner, Exclude<keyof TPartner, 'partnerId'>>;
  isForm?: boolean;
};

export const ModelView = ({
  isOpen,
  onClose,
  data: partner,
  isForm = false,
}: ModelViewProps) => {
  const dispatch = useDispatch();
  const handlerDeletePlace = (placeAdress: string) => {
    const placeIndex = partner?.places.findIndex(
      (element) => placeAdress === element.address
    );
    const newArray: TPlace[] | undefined = partner?.places.filter(
      (_, index) => index !== (placeIndex !== undefined ? placeIndex : -1)
    );
    dispatch(setPlaces(newArray!));
  };

  return (
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
                  key={place.coordinates.latitude + place.coordinates.longitude}
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
                    onClick={() => handlerDeletePlace(place.address)}
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
  );
};
