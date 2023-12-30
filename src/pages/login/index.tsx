import { Button, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { LoginForm, LoginWrapper } from '../../styles/login';

export const Login = () => {
  const [fields, setFields] = useState({
    login: '',
    password: '',
  });

  const handleFieldChange = (field: any, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (fields.login !== '' && fields.password !== '') {
      console.log('aaadadadada');
    }
  };

  return (
    <LoginWrapper>
      <LoginForm
        width={'43vh'}
        height={'32vh'}
        sx={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.20)',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FormLabel
          sx={{
            fontSize: 24,
            margin: 0,
            marginTop: '4vh',
            color: '#21A038',
          }}
        >
          Авторизация
        </FormLabel>
        <Stack spacing={4} width={'24rem'} sx={{ marginTop: '5vh' }}>
          <Input
            id="login"
            placeholder="login"
            size={'lg'}
            bg={'#fff'}
            borderColor={'#7ECC81'}
            focusBorderColor={'#6cad6e'}
            borderRadius={'10px'}
            onChange={(e) => handleFieldChange('login', e.target.value)}
            formNoValidate
          />
          <Input
            id="password"
            type="password"
            placeholder="password"
            size={'lg'}
            bg={'#fff'}
            borderColor={'#7ECC81'}
            focusBorderColor={'#6cad6e'}
            borderRadius={'10px'}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            formNoValidate
          />
        </Stack>
        <Button
          _hover={{
            bg: '#E5FFE4',
            color: '#21A038',
            border: '2px solid',
            borderColor: '#21A038',
          }}
          sx={{
            marginTop: '4vh',
            backgroundColor: '#21A038',
            color: '#FFFFFF',
            borderColor: '#21A038',
            width: '35%',
          }}
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </LoginForm>
    </LoginWrapper>
  );
};
