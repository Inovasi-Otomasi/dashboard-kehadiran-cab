import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Shift from "./pages/Shift";
import Driver from "./pages/Driver";
import Location from "./pages/Location";
import './App.css'



import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import EditShift from "./components/EditShift";
import EditRoute from "./components/EditRoute";
import Sidebar from "./components/Sidebar";
import EditDriver from "./components/EditDriver";
import DriverDetail from "./components/DriverDetail";


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar/>
        <main className="container-sm">
          <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route exact path="/shift" element={<Shift/>}/>
            <Route exact path="/shift/edit/:id" element={<EditShift/>}/>
            <Route exact path="/driver" element={<Driver/>}/>
            <Route exact path="/driver/edit/:id" element={<EditDriver/>}/>
            <Route exact path="/driver/details/:id" element={<DriverDetail />}/>
            <Route exact path="/location" element={<Location/>}/>
            <Route exact path="location/edit/:id" element={<EditRoute />}/>
            <Route exact path="*" element={<Error/>} />
          </Routes>
        </main>
        
      </div>
    </Router>
    
  );
}

export default App;
