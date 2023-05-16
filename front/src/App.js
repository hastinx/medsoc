import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Verification from './pages/auth/verification';
import List from './pages/home/list';
import Account from './pages/account/account';
import EditProfile from './pages/account/edit';
import PostContent from './pages/account/post';
import ResendToken from './pages/auth/resendToken';
import ForgotPassowrd from './pages/auth/forgotPassword';
import ResetPassowrd from './pages/auth/resetPassword';
import NotFound from './components/notFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/verification/:key" element={<Verification />} />
        <Route path="/register/resendToken" element={<ResendToken />} />
        <Route path="/resetPassword" element={<ForgotPassowrd />} />
        <Route path="/user/resetPassword/:key" element={<ResetPassowrd />} />
        <Route path="/home" element={<List />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/edit" element={<EditProfile />} />
        <Route path="/account/content/create" element={<PostContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
