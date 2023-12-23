import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { placemarks } from '../../__data__/smoke';
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
            {placemarks.map((placemark) => (
              <Placemark
                key={placemark.id}
                geometry={placemark.geometry}
                properties={placemark.properties}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/placemark.svg',
                }}
                onClick={() => handlePlacemarkClick(placemark.id)}
              />
            ))}
          </Clusterer>
        </Map>
      </YMaps>
    </YMapWrapper>
  );
};
