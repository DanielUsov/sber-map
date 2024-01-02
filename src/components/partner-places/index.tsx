import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import { setAdditionalInfo } from '../../__data__/slices/partner-form';
import { PartnerContainer as PartnerPlacesContainer } from '../../styles/partner';
import { Loader } from '../loader';
import { PartnerStapper } from '../partner-stapper';
import { Button, Input, Text } from '@chakra-ui/react';
import { PartnerСoordinatesContainer } from '../../styles/partner-places';
import { TCoordinates, TPlace } from '../../@types/partners';

export const PartnerPlaces = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const dispatch = useDispatch();
  const { step: newPartnerStep, places: newPartnerCurrentPlaces } = useSelector(
    (state: TRootState) => state.newPartner
  );
  const fieldsInitState: TPlace = {
    address: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  };
  const [fields, setFields] = useState<TPlace>(fieldsInitState);

  const handleCoordinatesChange = (field: string, value: string) => {
    setFields((prevFields) => ({
      ...prevFields.coordinates,
      [field]: value,
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

  console.log(fields);

  return (
    <>
      <PartnerStapper partnerStep={Number(newPartnerStep)} />
      <PartnerPlacesContainer
        style={{
          width: '50%',
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
                    fields.coordinates[field] !== 0
                      ? fields.coordinates[field]
                      : ''
                  }
                  bg={'#fff'}
                  border={'2px solid '}
                  borderColor={'#21a038'}
                  focusBorderColor={'#21A038'}
                  _hover={{
                    borderColor: '#21A038',
                  }}
                  borderRadius={'10px'}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  required={true}
                />
              </PartnerСoordinatesContainer>
            ))}
          </div>
          <Button
            // marginTop={'6vh'}
            width={'100%'}
            height={'3vh'}
            color="white"
            float={'right'}
            marginRight={'8px'}
            bg={'#21a038'}
            _hover={{ bg: '#21a038' }}
            // onClick={}
          >
            Добавить адрес
          </Button>
        </div>

        <div
          style={{
            width: '50%',
            backgroundColor: '#fff',
            height: '600px',
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
                {newPartnerCurrentPlaces.flatMap((place) => (
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
                    // properties={{
                    //   hintContent: place.title,
                    // }}
                    modules={[
                      'geoObject.addon.balloon',
                      'geoObject.addon.hint',
                    ]}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: '/placemark.svg',
                    }}
                  />
                ))}
              </Clusterer>
            </Map>
          </YMaps>
        </div>
      </PartnerPlacesContainer>
    </>
  );
};
