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

export type ModelViewProps = {
  isOpen: any;
  onClose: any;
  PID?: string;
  currentData?: Pick<TPartner, Exclude<keyof TPartner, 'partnerId'>>;
};

export const ModelView = ({
  isOpen,
  onClose,
  PID,
  currentData,
}: ModelViewProps) => {
  const fakeP: Pick<
    TPartner,
    Exclude<keyof TPartner, 'partnerId'>
  > = currentData
    ? currentData
    : {
        title: 'OAO <OAO>',
        conditions: ['сделать что-то', 'сделать еще что-то'],
        additionalInfo:
          'Помимо этого, для сотрудников каньона действует специальная цена 3000 рублей на тур в каньон «каньон». Если хотите попробовать, напишите @каньон',
        places: [
          {
            address: 'г.Сочи ул.Пушкина д.Колотушкина',
            coordinates: {
              latitude: 43.6017215,
              longitude: 39.7251289,
            },
          },
          {
            address: 'г.Сочи ул.Пушкина д.Колотушкина 2 ',
            coordinates: {
              latitude: 43.6017211,
              longitude: 39.7251289,
            },
          },
        ],
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Highlight
            query={fakeP.title ? fakeP.title : 'Пока названия нет'}
            styles={{ px: '2', py: '1', rounded: 'full', bg: '#E5FFE4' }}
          >
            {fakeP.title ? fakeP.title : 'Пока названия нет'}
          </Highlight>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="18">Условия предоставления скидки:</Text>
          {fakeP.conditions.length > 0 ? (
            fakeP.conditions.map((condition, index) => (
              <Text fontSize="16">{`${index + 1}. ${condition} `}</Text>
            ))
          ) : (
            <Text fontSize="16">{'Пока условий нет'}</Text>
          )}
          <Text fontSize="18" marginTop="12px">
            Дополнительная информация:
          </Text>
          <Text fontSize="16">{fakeP?.additionalInfo}</Text>
          <Text fontSize="18" marginTop="12px">
            Адреса:
          </Text>
          {fakeP.places.map((place: TPlace) => (
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
