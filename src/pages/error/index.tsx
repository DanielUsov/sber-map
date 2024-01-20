import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();

  const handlerBackPageRoute = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f6fe',
        color: '#000',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
        }}
      >
        Что-то пошло не так
      </h1>
      <p
        style={{
          fontSize: '1.2em',
        }}
      >
        Сервис верменно недоступен, повторите попытку позже
      </p>
      <Button
        _hover={{
          bg: '#E5FFE4',
          color: '#21A038',
          border: '2px solid',
          borderColor: '#21A038',
        }}
        sx={{
          marginTop: '2%',
          backgroundColor: '#21A038',
          color: '#FFFFFF',
          borderColor: '#21A038',
          width: '14%',
          height: '4%',
        }}
        onClick={handlerBackPageRoute}
      >
        Вернуться на главную
      </Button>
    </div>
  );
};
