import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import { PartnerStapper } from '../partner-stapper';

type TPartnerInfoProps = {
  oldConditions?: string[];
  oldAdditionalInfo?: string;
};

export const PartnerInfo = ({
  oldConditions = [],
  oldAdditionalInfo = '',
}: TPartnerInfoProps) => {
  const newPartnerStep = useSelector(
    (state: TRootState) => state.newPartner.step
  );
  const [fields, setFields] = useState({
    conditions: oldConditions,
    additionalInfo: oldAdditionalInfo,
  });

  const handleFieldChange = (field: any, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
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
          onChange={(e) => handleFieldChange('', e.target.value)}
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
          onChange={(e) => handleFieldChange('', e.target.value)}
          required={true}
        />
      </div>
    </>
  );
};
