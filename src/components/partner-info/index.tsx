import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import {
  setAdditionalInfo,
  setConditions,
} from '../../__data__/slices/partner-form';
import { PartnerContainer as PartnerInfoContainer } from '../../styles/partner';
import { PartnerStapper } from '../partner-stapper';

export const PartnerInfo = () => {
  const { step: newPartnerStep, conditions: currentConditions } = useSelector(
    (state: TRootState) => state.newPartner
  );
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    condition: '',
    additionalInfo: '',
  });

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'additionalInfo') dispatch(setAdditionalInfo(value));
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const addNewCondition = () => {
    if (fields.condition !== '') {
      const resultConditions = [...currentConditions, fields.condition];
      dispatch(setConditions(resultConditions));
      handleFieldChange('condition', '');
    }
  };

  return (
    <>
      <PartnerStapper partnerStep={Number(newPartnerStep)} />
      <PartnerInfoContainer>
        <Text fontSize={20}>Условия предоставления скидки:</Text>
        <Input
          value={fields.condition}
          formNoValidate
          marginTop={'1%'}
          width={'45%'}
          placeholder="Напишите условие"
          size={'lg'}
          bg={'#fff'}
          border={'2px solid '}
          borderColor={'#21a038'}
          focusBorderColor={'#21A038'}
          _hover={{
            borderColor: '#21A038',
          }}
          borderRadius={'10px'}
          onChange={(e) => handleFieldChange('condition', e.target.value)}
          required={true}
        />
        <Button
          marginTop={'2%'}
          width={'45%'}
          height={'3vh'}
          color="white"
          marginRight={'8px'}
          bg={'#21a038'}
          _hover={{ bg: '#21a038' }}
          onClick={addNewCondition}
        >
          Добавить условие
        </Button>
        <Text fontSize={20} marginTop={'2%'}>
          Дополнительная информация:
        </Text>
        <Textarea
          value={fields.additionalInfo}
          marginTop={'1%'}
          width={'45%'}
          maxH={'300px'}
          placeholder="Дополнительная информация"
          size={'lg'}
          bg={'#fff'}
          border={'2px solid '}
          borderColor={'#21a038'}
          focusBorderColor={'#21A038'}
          _hover={{
            borderColor: '#21A038',
          }}
          borderRadius={'10px'}
          onChange={(e) => handleFieldChange('additionalInfo', e.target.value)}
          required={true}
        />
      </PartnerInfoContainer>
    </>
  );
};
