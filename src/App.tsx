//import './App.css'
//import { Layout } from 'antd';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Doglist from './pages/Doglist';
import Stafflogin from './pages/Stafflogin';
import Staffreg from './pages/StaffReg';


//const { Header, Footer, Content } = Layout;
//const { Text } = Typography;

const App = () => {

  window.ApiServerURL='http://127.0.0.1:1337';

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doglist" element={<Doglist />} />
        <Route path="/slogin" element={<Stafflogin />} />
        <Route path="/staffreg" element={<Staffreg />} />
      </Routes>
    </Router>
  )
}

export default App
