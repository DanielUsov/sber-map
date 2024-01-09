import { Button, Input, Text } from '@chakra-ui/react';
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPlace } from '../../@types/partners';
import { TRootState } from '../../@types/redux';
import { setPlaces } from '../../__data__/slices/new-partner';
import { setPlaces as editSetPlaces } from '../../__data__/slices/edit-partner';

import { PartnerContainer as PartnerPlacesContainer } from '../../styles/partner';
import { PartnerСoordinatesContainer } from '../../styles/partner-places';
import { Loader } from '../loader';
import { PartnerStapper } from '../partner-stapper';

type TPartnerPlacesProps = {
  isEditing?: boolean;
};

export const PartnerPlaces = ({ isEditing = false }: TPartnerPlacesProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const dispatch = useDispatch();
  const { step: newPartnerStep, places: newPartnerPlaces } = useSelector(
    (state: TRootState) => state.newPartner
  );
  const { step: editPartnerStep, places: editPartnerPlaces } = useSelector(
    (state: TRootState) => state.editPartner
  );
  const fieldsInitState: TPlace = {
    partner_id: '',
    place_id: 0,
    address: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  };
  const [fields, setFields] = useState<TPlace>(fieldsInitState);

  const handleCoordinatesChange = (field: string, value: string) => {
    setFields((prevState) => ({
      ...prevState,
      coordinates: {
        ...prevState.coordinates,
        [field]: value,
      },
    }));
  };

  const handleFieldChange = (field: string, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const handleClick = () => {
    dispatch(
      isEditing
        ? editSetPlaces(editPartnerPlaces.concat(fields))
        : setPlaces(newPartnerPlaces.concat(fields))
    );
    setFields(fieldsInitState);
  };

  return (
    <>
      <PartnerStapper
        partnerStep={Number(isEditing ? editPartnerStep : newPartnerStep)}
      />
      <PartnerPlacesContainer
        style={{
          width: '50vw',
          height: '50vh',
          flexDirection: 'row',
          padding: '0',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '2%',
          }}
        >
          <div style={{ width: '100%', padding: '2vh' }}>
            <div>
              <Text fontSize={20}>Напишите адрес здания:</Text>
              <Input
                formNoValidate
                alt="Напишите адрес здания:"
                marginTop={'2%'}
                width={'85%'}
                placeholder="Адрес компании"
                size={'lg'}
                value={fields.address}
                bg={'#fff'}
                border={'2px solid '}
                borderColor={'#21a038'}
                focusBorderColor={'#21A038'}
                _hover={{
                  borderColor: '#21A038',
                }}
                borderRadius={'10px'}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                required={true}
              />
            </div>
            {Object.keys(fields.coordinates).map((field: string) => (
              <PartnerСoordinatesContainer
                style={{
                  marginTop: field === 'latitude' ? '6%' : '2%',
                }}
              >
                <Text fontSize={20}>Введите широту здания:</Text>
                <Input
                  formNoValidate
                  alt={`Введите ${
                    field === 'latitude' ? 'Широту' : 'Долготу'
                  } здания:`}
                  width={'45%'}
                  placeholder={`${
                    field === 'latitude' ? 'Широта' : 'Долгота'
                  } здания`}
                  size={'lg'}
                  value={
                    fields?.coordinates[field] === 0
                      ? ''
                      : fields?.coordinates[field]
                  }
                  bg={'#fff'}
                  border={'2px solid '}
                  borderColor={'#21a038'}
                  focusBorderColor={'#21A038'}
                  _hover={{
                    borderColor: '#21A038',
                  }}
                  borderRadius={'10px'}
                  onChange={(e) =>
                    handleCoordinatesChange(field, e.target.value)
                  }
                  required={true}
                />
              </PartnerСoordinatesContainer>
            ))}
          </div>
          <Button
            width={'100%'}
            height={'3.5vh'}
            color="white"
            float={'right'}
            marginRight={'8px'}
            bg={'#21a038'}
            _hover={{ bg: '#21a038' }}
            onClick={handleClick}
          >
            Добавить адрес
          </Button>
        </div>

        <div
          style={{
            width: '30vw',
            backgroundColor: '#fff',
            height: '100%',
            borderRadius: '20px',
          }}
        >
          <YMaps query={{ lang: 'ru_RU', load: 'util.bounds' }}>
            {isMapLoaded ? null : <Loader />}
            <Map
              defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
              style={{ height: '100%', width: '100%' }}
              onLoad={handleMapLoad}
            >
              <Clusterer
                options={{
                  preset: 'islands#invertedVioletClusterIcons',
                  groupByCoordinates: false,
                }}
              >
                {(isEditing ? editPartnerPlaces : newPartnerPlaces).flatMap(
                  (place) => (
                    <Placemark
                      key={
                        place.coordinates.latitude + place.coordinates.longitude
                      }
                      geometry={{
                        type: 'Point',
                        coordinates: [
                          place.coordinates.latitude,
                          place.coordinates.longitude,
                        ],
                      }}
                      modules={[
                        'geoObject.addon.balloon',
                        'geoObject.addon.hint',
                      ]}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: '/placemark.svg',
                      }}
                    />
                  )
                )}
              </Clusterer>
            </Map>
          </YMaps>
        </div>
      </PartnerPlacesContainer>
    </>
  );
};
