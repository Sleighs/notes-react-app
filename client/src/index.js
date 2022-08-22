import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './Context/themeContext';
import { EditorContextProvider } from './Context/editorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeContextProvider>
      <EditorContextProvider>
        <App />
      </EditorContextProvider>
    </ThemeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
