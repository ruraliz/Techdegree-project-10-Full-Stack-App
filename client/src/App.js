import { Route, Routes } from "react-router-dom";
import './styles/global.css';

import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";

function App() {

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
        </Routes>
    </div>
  );
}

export default App;
