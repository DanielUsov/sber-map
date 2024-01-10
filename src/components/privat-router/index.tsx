import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export const PrivateRouter: React.FC<any> = ({ element }: any) => {
  const { getStatus } = useAuth();

  return getStatus() ? element : <Navigate to={'/admin'} replace />;
};
