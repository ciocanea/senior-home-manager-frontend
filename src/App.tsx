import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home_page';
import HelloWorldPage from './pages/hello_world/hello_world_page';

import './App.css';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello_world" element={<HelloWorldPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
