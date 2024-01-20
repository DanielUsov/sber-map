import { Button, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../__data__/services/api/auth';
import { Loader } from '../../components/loader';
import { LoginForm, LoginWrapper } from '../../styles/login';

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [singIn, { isSuccess, isLoading }] = useLoginMutation();
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (fields.login !== '' && fields.password !== '') {
      await singIn({ email: fields.login, password: fields.password });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(location.pathname + '/allPartners');
    }
  }, [isSuccess]);

  return (
    <LoginWrapper>
      {isLoading ? (
        <Loader />
      ) : (
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
          <Stack spacing={4} width={'80%'} sx={{ marginTop: '5vh' }}>
            <Input
              id="login"
              type="text"
              placeholder="login"
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
              marginTop: '4%',
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
      )}
    </LoginWrapper>
  );
};
