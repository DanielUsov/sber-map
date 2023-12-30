import { Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import { setTitle } from '../../__data__/slices/partner-form';
import { PartnerStapper } from '../partner-stapper';

type TPartnerTitleProps = {
  oldTitle?: string;
};

export const PartnerTitle = ({ oldTitle = '' }: TPartnerTitleProps) => {
  const newPartnerStep = useSelector(
    (state: TRootState) => state.newPartner.step
  );
  const [currentTitle, setCurrentTitle] = useState<string>(oldTitle);
  const dispatch = useDispatch();

  const handleChenge = (inputValue: string) => {
    setCurrentTitle(inputValue);
    dispatch(setTitle(inputValue));
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
        <Text fontSize={20}>Как называется компания партнер?</Text>
        <Input
          formNoValidate
          alt="Как называется компания партнер?"
          marginTop={'5%'}
          width={'45%'}
          placeholder="Название компании"
          size={'lg'}
          value={currentTitle}
          bg={'#fff'}
          border={'2px solid '}
          borderColor={'#21a038'}
          focusBorderColor={'#21A038'}
          _hover={{
            borderColor: '#21A038',
          }}
          borderRadius={'10px'}
          onChange={(e) => handleChenge(e.target.value)}
          required={true}
        />
      </div>
    </>
  );
};
