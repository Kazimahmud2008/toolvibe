import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ইম্পোর্ট যোগ করুন
import App from './App';
import QRCodePage from './pages/QRCode/QRCodePage'; // সঠিক পাথে ইম্পোর্ট
import NotFound from './components/NotFound/NotFound'; // সঠিক পাথে ইম্পোর্ট
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
