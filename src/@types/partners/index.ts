export type TPlace = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
