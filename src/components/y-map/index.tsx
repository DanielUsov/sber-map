import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const YMap = () => {
  const features = [
    {
      type: 'Feature',
      id: '3',
      geometry: {
        type: 'Point',
        coordinates: [43.595861, 39.730634],
      },
      properties: {
        hintContent: 'Описание для точки 1',
        iconContent: '1',
      },
    },
    {
      type: 'Feature',
      id: '2',
      geometry: {
        type: 'Point',
        coordinates: [43.598022, 39.727966],
      },
      properties: {
        hintContent: 'Описание для точки 2',
        iconContent: '2',
      },
    },
  ];

  const handlePlacemarkClick = (markId: string) => {
    console.log(markId);
  };

  return (
    <>
      <YMaps>
        <Map
          style={{ width: '800px', height: '800px' }}
          defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
            }}
          >
            <FaMapMarkerAlt />
            {features.map((feature) => (
              <Placemark
                key={feature.id}
                geometry={feature.geometry}
                properties={feature.properties}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/path/to/newIcon.png',
                }}
                onClick={() => handlePlacemarkClick(feature.id)}
              />
            ))}
          </Clusterer>
          {/* <ObjectManager
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: 'islands#greenDotIcon',
            }}
            clusters={{
              preset: 'islands#redClusterIcons',
            }}
            defaultFeatures={features}
            modules={[
              'objectManager.addon.objectsBalloon',
              'objectManager.addon.objectsHint',
            ]}
            instanceRef={(ref: any) => console.log(Object.keys(ref.objects))}
          /> */}
        </Map>
      </YMaps>
    </>
  );
};
