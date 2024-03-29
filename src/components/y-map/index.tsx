import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { Clusterer, Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { YMapWrapper } from '../../styles/main';
import { Loader } from '../loader';
import { ModelView } from '../modal-view/inex';
import { TPartner } from '../../@types/partners';
import { useGetPartnerByIdQuery } from '../../__data__/services/api/partner';

type TYMapProps = {
  data: TPartner[];
};

export const YMap = ({ data: partners }: TYMapProps) => {
  const [PID, setPID] = useState('');
  const [isSmallerThan1280] = useMediaQuery('(max-width: 1280px)');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [partnerToMV, setPartnerToMV] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: partner, refetch: refetchPartner } = useGetPartnerByIdQuery(PID);

  console.log(isSmallerThan1280);

  const handlePlacemarkClick = async (placeId: string) => {
    await setPID(placeId);
    await refetchPartner()
      .unwrap()
      .then((PartnerById) => {
        setPartnerToMV(PartnerById);
      });
    onOpen();
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <>
      <YMaps>
        {isMapLoaded ? null : <Loader />}
        <Map
          defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
          style={{ height: '100%', width: '100%' }}
          onLoad={handleMapLoad}
        >
          <ZoomControl options={{ position: { top: 300, right: 10 } }} />
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
            }}
          >
            {partners?.flatMap((placemark) =>
              placemark.places.map((place) => (
                <Placemark
                  key={placemark.partnerId}
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
      {Object.keys(partnerToMV).length > 0 ? (
        <ModelView isOpen={isOpen} onClose={onClose} data={partnerToMV as TPartner} />
      ) : null}
    </>
  );
};
