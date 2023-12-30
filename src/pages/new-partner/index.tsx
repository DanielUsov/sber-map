import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TRootState } from '../../@types/redux';
import {
  clearNewPartnerState,
  setStep,
} from '../../__data__/slices/partner-form';
import { PartnerInfo } from '../../components/partner-info';
import { PartnerTitle } from '../../components/partner-title';
import { steps } from '../../config';
import { ModelView } from '../../components/modal-view/inex';

export const NewPartner = () => {
  const { step } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newPartnerData = useSelector((state: TRootState) => state.newPartner);

  const handlerCancel = () => {
    dispatch(clearNewPartnerState());
    navigate('/admin/allPartners', { replace: true });
  };

  const handlerCreate = () => {};

  const handlerNext = () => {
    if (Number(step) !== steps.length - 1) {
      navigate(`/admin/newPartner/${Number(step) + 1}`, { replace: true });
      handlerCreate();
    }
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
          // justifyContent: 'center',
          flexDirection: 'column',
          height: '90vh',
          width: '100%',
        }}
      >
        {Number(step) >= 0 && Number(step) < 4 && (
          <>
            {Number(step) === 0 ? <PartnerTitle /> : null}
            {Number(step) === 1 ? <PartnerInfo /> : null}
            {Number(step) === 2 ? <PartnerTitle /> : null}
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
          width={'14vh'}
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
          width={'24vh'}
          height={'3vh'}
          color="white"
          bg={'#21a038'}
          _hover={{ bg: '#21a038' }}
          isDisabled={false}
        >
          Посмотреть текущий вариант
        </Button>
        <Button
          marginTop={'2%'}
          width={'14vh'}
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
      <ModelView isOpen={isOpen} onClose={onClose} PID={PID} />
    </>
  );
};
