import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '../../@types/redux';
import { PartnerStapper } from '../partner-stapper';
import { setConditions } from '../../__data__/slices/partner-form';

export const PartnerInfo = () => {
  const newPartnerStep = useSelector(
    (state: TRootState) => state.newPartner.step
  );
  const dispatch = useDispatch();
  const currentConditions = useSelector(
    (state: TRootState) => state.newPartner.conditions
  );

  const [fields, setFields] = useState({
    condition: '',
    additionalInfo: '',
  });

  const handleFieldChange = (field: any, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const addNewCondition = () => {
    const resultConditions = [...currentConditions, fields.condition];
    dispatch(setConditions(resultConditions));
    handleFieldChange('condition', '');
  };

  return (
    <>
      <PartnerStapper partnerStep={Number(newPartnerStep)} />
      <div
        style={{
          padding: '3vh',
          marginTop: '14vh',
          width: '40%',
          border: '2px solid',
          borderRadius: '10px',
          borderColor: '#21a038',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text fontSize={20}>Условия предоставления скидки:</Text>
        <Input
          value={fields.condition}
          formNoValidate
          marginTop={'1%'}
          width={'45%'}
          placeholder="Название компании"
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
          marginTop={'1%'}
          width={'45%'}
          placeholder="Название компании"
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
      </div>
    </>
  );
};
