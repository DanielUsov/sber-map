import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import {
  setAdditionalInfo,
  setConditions as setConditionsNewPartner,
} from '../../__data__/slices/new-partner';
import { PartnerContainer as PartnerInfoContainer } from '../../styles/partner';
import { PartnerStapper } from '../partner-stapper';
import { setConditions as setConditionsEditPartner } from '../../__data__/slices/edit-partner';

type TPartnerInfoProps = {
  isEditing?: boolean;
};

export const PartnerInfo = ({ isEditing = false }: TPartnerInfoProps) => {
  const {
    step: newPartnerStep,
    conditions: currentConditions,
    additionalInfo: currentAdditionalInfo,
  } = useSelector((state: TRootState) => state.newPartner);
  const {
    step: editStep,
    conditions: oldConditions,
    additionalInfo: oldAdditionalInfo,
  } = useSelector((state: TRootState) => state.editPartner);
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    condition: '',
    additionalInfo: isEditing ? oldAdditionalInfo : currentAdditionalInfo,
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
      if (isEditing) {
        const resultConditions = [...oldConditions, fields.condition];
        dispatch(setConditionsEditPartner(resultConditions));
      } else {
        const resultConditions = [...currentConditions, fields.condition];
        dispatch(setConditionsNewPartner(resultConditions));
      }

      handleFieldChange('condition', '');
    }
  };

  useEffect(() => {
    console.log(isEditing);

    if (isEditing && oldAdditionalInfo)
      handleFieldChange('additionalInfo', oldAdditionalInfo);
  }, [isEditing, oldAdditionalInfo]);

  return (
    <>
      <PartnerStapper
        partnerStep={Number(isEditing ? editStep : newPartnerStep)}
      />
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
