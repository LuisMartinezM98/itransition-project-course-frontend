import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';

const ProtectedRoute: React.FC = () => {
  return !isAuthenticated() ? 
  (
    <body>
      <Header/>
      <Outlet/>
      <Footer/>
    </body>
  )
  : <Navigate to="/login" />;
};


export default ProtectedRoute;