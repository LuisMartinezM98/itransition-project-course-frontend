import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import { useAuth } from '../Providers/Providers';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth(); 

  return isAuthenticated(token) ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
