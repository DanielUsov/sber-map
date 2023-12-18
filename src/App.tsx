import { YMaps, Map } from '@pbe/react-yandex-maps';

export const App = () => {
  return (
    <YMaps>
      <Map
        style={{ width: '800px', height: '800px'}}
        defaultState={{ center: [43.6017215, 39.7251289], zoom: 10 }}
      />
    </YMaps>
  );
};
