import { useDisclosure } from '@chakra-ui/react';
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useState } from 'react';
import { partnersForMain as placemarks } from '../../__data__/smoke';
import { YMapWrapper } from '../../styles/main';
import { Loader } from '../loader';
import { ModelView } from '../modal-view/inex';

export const YMap = () => {
  const [PID, setPID] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePlacemarkClick = (markId: string) => {
    onOpen();
    setPID(markId);
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <>
      <YMapWrapper>
        <YMaps>
          {isMapLoaded ? null : <Loader />}
          <Map
            defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
            style={{ height: '100%', width: '100%', float: 'right' }}
            onLoad={handleMapLoad}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
              }}
            >
              {placemarks.flatMap((placemark) =>
                placemark.places.map((place) => (
                  <Placemark
                    key={placemark.partnerId + placemark.title}
                    geometry={{
                      type: 'Point',
                      coordinates: [
                        place.coordinates.latitude,
                        place.coordinates.longitude,
                      ],
                    }}
                    properties={{
                      hintContent: placemark.title,
                    }}
                    modules={[
                      'geoObject.addon.balloon',
                      'geoObject.addon.hint',
                    ]}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: '/placemark.svg',
                    }}
                    onClick={() => handlePlacemarkClick(placemark.partnerId)}
                  />
                ))
              )}
            </Clusterer>
          </Map>
        </YMaps>
      </YMapWrapper>
      <ModelView isOpen={isOpen} onClose={onClose} PID={PID} />
    </>
  );
};
