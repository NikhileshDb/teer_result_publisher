import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/css/output.css';
import HomeScreen from './lib/Home/HomeScreen'
import CommonNumberScreen from "./lib/CommonNumber/CommonNumber";
import NavBar from './lib/Components/NavBar';
function App() {
  return (

    <BrowserRouter>
      <div className="flex flex-row">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/common-number" element={<CommonNumberScreen />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
