import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse"
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/Notfound";

function App() {

  return (
    <div id="root">
      <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
