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
import { useGetPartnerByIdQuery } from '../../__data__/services/api/partner';
import { setInit } from '../../__data__/slices/edit-partner';

export const EditPartner = () => {
  const { id: partnerId, step } = useParams();
  const { data, isError } = useGetPartnerByIdQuery(partnerId ?? '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const partnerData = useSelector((state: TRootState) => state.editPartner);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlerCancel = () => {
    dispatch(clearNewPartnerState());
    navigate('/admin/allPartners', { replace: true });
  };

  const handlerEdit = () => {};

  const handlerNext = () => {
    if (Number(step) === steps.length - 1) {
      handlerEdit();
      return navigate(`/admin/allPartners`, { replace: true });
    }
    navigate(`/admin/newPartner/${Number(step) + 1}`, { replace: true });
  };

  const chackCurrent = () => {
    onOpen();
  };

  useEffect(() => {
    if (data && partnerId) {
      dispatch(
        setInit({
          partnerId: partnerId,
          title: data.title,
          conditions: data.conditions,
          additionalInfo: data.additionalInfo,
          places: data.places,
          step: -1,
        })
      );
    }
  });

  useEffect(() => {
    dispatch(setStep(Number(step) + 1));
  }, [Number(step)]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError]);

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
            {Number(step) === 0 ? <PartnerTitle isEditing /> : null}
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
          {Number(step) === steps.length - 1 ? 'Сохранить' : 'Далее'}
        </Button>
      </div>
      <ModelView isOpen={isOpen} onClose={onClose} currentData={partnerData} />
    </>
  );
};
