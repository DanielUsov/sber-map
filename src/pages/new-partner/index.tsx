import { Button, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TRootState } from '../../@types/redux';
import {
  clearNewPartnerState,
  setStep,
} from '../../__data__/slices/new-partner';
import { ModelView } from '../../components/modal-view/inex';
import { PartnerInfo } from '../../components/partner-info';
import { PartnerPlaces } from '../../components/partner-places';
import { PartnerTitle } from '../../components/partner-title';
import { steps } from '../../config';
import { useCreatePartnerMutation } from '../../__data__/services/api/partner';

export const NewPartner = () => {
  const { step } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createNewPartner, r] = useCreatePartnerMutation();
  const newPartnerData = useSelector((state: TRootState) => state.newPartner);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlerCancel = () => {
    dispatch(clearNewPartnerState());
    navigate('/admin/allPartners', { replace: true });
  };

  const handlerCreate = () => {
    createNewPartner(newPartnerData);
  };

  const handlerNext = () => {
    if (Number(step) === steps.length - 1) {
      handlerCreate();
      return navigate(`/admin/allPartners`, { replace: true });
    }
    navigate(`/admin/newPartner/${Number(step) + 1}`, { replace: true });
  };

  const chackCurrent = () => {
    onOpen();
  };

  useEffect(() => {
    dispatch(setStep(Number(step) + 1));
  }, [Number(step)]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '90vh',
          width: '100%',
        }}
      >
        {Number(step) >= 0 && Number(step) < 4 && (
          <>
            {Number(step) === 0 ? <PartnerTitle /> : null}
            {Number(step) === 1 ? <PartnerInfo /> : null}
            {Number(step) === 2 ? <PartnerPlaces /> : null}
          </>
        )}
      </div>
      <div
        style={{
          marginTop: '2vh',
          height: '6vh',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          marginTop={'2%'}
          width={'6rem'}
          height={'3vh'}
          color="white"
          marginLeft={'8px'}
          bg={'#21a038'}
          _hover={{ bg: '#21a038' }}
          isDisabled={false}
          onClick={handlerCancel}
        >
          Отмена
        </Button>
        <Button
          marginTop={'2%'}
          width={'16rem'}
          height={'3vh'}
          color="white"
          bg={'#21a038'}
          _hover={{ bg: '#21a038' }}
          isDisabled={false}
          onClick={chackCurrent}
        >
          Посмотреть текущий вариант
        </Button>
        <Button
          marginTop={'2%'}
          width={'6rem'}
          height={'3vh'}
          color="white"
          marginRight={'8px'}
          bg={'#21a038'}
          _hover={{ bg: '#21a038' }}
          isDisabled={false}
          onClick={handlerNext}
        >
          {Number(step) === steps.length - 1 ? 'Создать' : 'Далее'}
        </Button>
      </div>
      <ModelView
        isOpen={isOpen}
        onClose={onClose}
        data={newPartnerData!}
        isForm
      />
    </>
  );
};
