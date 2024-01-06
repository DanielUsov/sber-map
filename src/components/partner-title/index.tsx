import { Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../@types/redux';
import { setTitle } from '../../__data__/slices/new-partner';
import { PartnerContainer as PartnerTitleContainer } from '../../styles/partner';
import { PartnerStapper } from '../partner-stapper';

type TPartnerTitleProps = {
  isEditing?: boolean;
};

export const PartnerTitle = ({ isEditing = false }: TPartnerTitleProps) => {
  const { step: newPartnerStep, title: newPartnerTitle } = useSelector(
    (state: TRootState) => state.newPartner
  );
  const { title: oldTitle, step: editStep } = useSelector(
    (state: TRootState) => state.editPartner
  );
  const [currentTitle, setCurrentTitle] = useState<string>(
    isEditing ? oldTitle : newPartnerTitle
  );
  const dispatch = useDispatch();

  const handleChenge = (inputValue: string) => {
    setCurrentTitle(inputValue);
    dispatch(setTitle(inputValue));
  };

  return (
    <>
      <PartnerStapper
        partnerStep={Number(isEditing ? editStep : newPartnerStep)}
      />
      <PartnerTitleContainer>
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
      </PartnerTitleContainer>
    </>
  );
};
