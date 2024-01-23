export type TCoordinates = {
  latitude: number;
  longitude: number;
  [key: string]: any;
};

export type TPlace = {
  address: string;
  coordinates: TCoordinates;
  partner_id: string;
  place_id: number;
};

export type TPartner = {
  additionalInfo: string;
  conditions: string[];
  partnerId: string;
  places: TPlace[];
  title: string;
};
