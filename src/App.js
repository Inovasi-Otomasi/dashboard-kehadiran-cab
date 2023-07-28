import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <div className="main-wrapper ">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="*" element={<Error/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
