import Login from "./pages/Login";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Fileupload from "./pages/Fileupload";
import ImageHistory from "./pages/ImageHistory";
import ImageDetails from "./pages/ImageDetails";
import QuickTest from "./pages/QuickTest";
import ModelMatrix from "./pages/ModelMatrix";

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<PrivateRoute><Fileupload /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><ImageHistory /></PrivateRoute>} />
        <Route path="/imagedetails" element={<PrivateRoute><ImageDetails /></PrivateRoute>} />
        <Route path="/quicktest" element={<PrivateRoute><QuickTest /></PrivateRoute>} />
        <Route path="/modelmatrix" element={<PrivateRoute><ModelMatrix /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
}

export default App;

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to='/' />;
}
