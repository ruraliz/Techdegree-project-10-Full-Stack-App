import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= "/" element= "http://localhost:5000/api/courses" />
      </Routes>
    </div>
  );
}

export default App;
