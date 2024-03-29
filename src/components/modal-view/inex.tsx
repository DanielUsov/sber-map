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
import { useDispatch } from 'react-redux';
import { TPartner, TPlace } from '../../@types/partners';
import {
  setConditions as setEditPartnerConditions,
  setPlaces as setEditPartnerPlaces,
} from '../../__data__/slices/edit-partner';
import {
  setConditions as setNewPartnerConditions,
  setPlaces as setNewPartnerPlaces,
} from '../../__data__/slices/new-partner';

import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const dispatch = useDispatch();

  const removeFromArrayByIndex = (arr: string[], index: number) => {
    const arrClone = [...arr];
    arrClone.splice(index, 1);
    return arrClone;
  };

  const handlerDeletePlace = (placeAdress: string) => {
    const placeIndex = partner?.places.findIndex(
      (element) => placeAdress === element.address
    );
    const newPlacesList: TPlace[] | undefined = partner?.places.filter(
      (_, index) => index !== (placeIndex !== undefined ? placeIndex : -1)
    );
    dispatch(
      location.pathname.includes('newPartner')
        ? setNewPartnerPlaces(newPlacesList)
        : setEditPartnerPlaces(newPlacesList)
    );
  };

  const handlerConditionDelete = (conditionIndex: number) => {
    const newConditionsList = removeFromArrayByIndex(partner?.conditions, conditionIndex);
    dispatch(
      location.pathname.includes('newPartner')
        ? setNewPartnerConditions(newConditionsList)
        : setEditPartnerConditions(newConditionsList)
    );
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom:
                      partner.conditions[partner.conditions.length - 1] === condition
                        ? '1%'
                        : '0',
                  }}
                >
                  <Text fontSize="16">{`${index + 1}. ${condition} `}</Text>
                  {isForm ? (
                    <IconButton
                      marginLeft={'10px'}
                      width={'2%'}
                      height={'26px'}
                      _hover={{ bg: '#21A038' }}
                      bg={'#F0F6FE'}
                      aria-label={'Редактировать'}
                      onClick={() => handlerConditionDelete(index)}
                    >
                      <MdDelete />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </div>
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
