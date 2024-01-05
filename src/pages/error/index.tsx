export const Error = () => {
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
    </div>
  );
};
