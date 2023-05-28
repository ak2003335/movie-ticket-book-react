import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Registration from "./pages/Registration";
import UploadTheater from "./pages/UploadTheater";
import Alltheater from "./pages/Alltheater";
import Seats from "./pages/Seats";

function App() {
  return (
    <Router>
      <ToastContainer />

      <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/upload-theater" element={<UploadTheater />} />
        <Route path="/all-theaters" element={<UploadTheater />} />
        <Route path="/book-ticket" element={<Alltheater />} />
        <Route path="/theater/:id" element={<Seats />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
