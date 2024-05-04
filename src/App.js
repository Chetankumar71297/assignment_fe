import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
//import { useSelector } from "react-redux";
import User from "./pages/user";

function App() {
  /*const { user } = useSelector((state) => state.user);
  const { token } = user;*/
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/user/:userId" element={ <User /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
