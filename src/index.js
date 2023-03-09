import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/Header';
import Footer from './components/footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <React.StrictMode>
            <Header />
            <App />
            <Footer />
        </React.StrictMode>
    </div>
);