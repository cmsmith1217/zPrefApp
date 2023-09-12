import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Inventory from './Inventory';
import ItemDetails from './ItemDetails';
import MyInventory from './MyInventory';

function App() {
  return (
    <>
      <h1>some shit on a page</h1>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/inventory/:id' element={<ItemDetails/>}/>
        <Route path='/myinventory' element={<MyInventory/>}/>
      </Routes>
    </>
  );
}

export default App;
