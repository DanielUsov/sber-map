import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { partnersForMain as placemarks } from '../../__data__/smoke';
import { YMapWrapper } from '../../styles/main';

export const YMap = () => {
  const handlePlacemarkClick = (markId: string) => {
    console.log(markId);
  };

  return (
    <YMapWrapper>
      <YMaps>
        <Map
          defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
          style={{ height: '100vh' }}
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
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
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
  );
};
