import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {StateProvider} from "./context/StateProvider";
import {initialState} from "./context/initialState";
import reducer from "./context/reducer";
import {ScreenWidthProvider} from "./context/ScreenWidthContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScreenWidthProvider>
                <StateProvider initialState={initialState} reducer={reducer}>
                    <App />
                </StateProvider>
            </ScreenWidthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

