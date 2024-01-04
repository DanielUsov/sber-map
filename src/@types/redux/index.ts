import { TEditPartner } from '../../__data__/slices/edit-partner';
import { TNewPartner } from '../../__data__/slices/new-partner';

export type TRootState = {
  newPartner: TNewPartner;
  editPartner: TEditPartner;
};
