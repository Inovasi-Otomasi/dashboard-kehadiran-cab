import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Shift from "./pages/Shift";
import Driver from "./pages/Driver";
import Location from "./pages/Location";


import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import EditShift from "./components/EditShift";
import EditRoute from "./components/EditRoute";


function App() {
  return (
    <Router>
      <div className="main-wrapper ">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/shift" element={<Shift/>}/>
          <Route exact path="/shift/edit/:id" element={<EditShift/>}/>
          <Route exact path="/driver" element={<Driver/>}/>
          <Route exact path="/location" element={<Location/>}/>
          <Route exact path="location/edit/:id" element={<EditRoute />}/>
          <Route exact path="*" element={<Error/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
