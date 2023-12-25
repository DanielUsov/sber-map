export type TPlaces = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type TPartnersWithPlacemarks = {
  partnerId: string;
  title: string;
  places: TPlaces[];
};
