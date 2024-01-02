export type TCoordinates = {
  latitude: number;
  longitude: number;
};

export type TPlace = {
  address: string;
  coordinates: TCoordinates;
};

export type TPartnerWithPlacemarks = {
  partnerId: string;
  title: string;
  places: TPlace[];
};

export type TPartner = {
  partnerId: string;
  title: string;
  conditions: string[];
  additionalInfo: string;
  places: TPlace[];
};
