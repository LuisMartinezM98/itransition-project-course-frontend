import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import { useAuth } from '../Providers/Providers';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import HelpButton from '../components/UI/HelpButton';

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth(); 
  const location = useLocation();

  return isAuthenticated(token) ? (
    <>
      <Header />
      <HelpButton/>
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
