import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/Store/store';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(0, 159, 43)', // Change this to your desired primary color
            },
          }}
        >


          <App />
        </ConfigProvider>

      </Provider>

    </BrowserRouter>

);


reportWebVitals();
