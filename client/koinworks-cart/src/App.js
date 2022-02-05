import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import MyCart from './pages/MyCart';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<MyCart />} />
      </Routes>
    </div>
  );
}

export default App;
