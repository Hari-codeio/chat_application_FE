import{ BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogIn } from '../Pages/logIn';
import { Home } from '../Pages/home';
import { Users } from '../Pages/users';
import { SignUp } from '../Pages/signUp';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};