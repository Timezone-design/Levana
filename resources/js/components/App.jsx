import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {store} from "./redux/CreateStore";
import Routes from './Routes';
import { Provider } from "react-redux";
import './App.css';

if (document.getElementById('home')) {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App" id="App">
                        <Routes />
                    </div>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById('home'));
}

// if (document.getElementById('home')){
//     ReactDOM.render(
//         <React.StrictMode>
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <div className="App">
//                         <Routes />
//                     </div>    
//                 </BrowserRouter>
//             </Provider>
//         </React.StrictMode>,
//         document.getElementById('home')
//     );
// }