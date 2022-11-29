import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {  
  
  BrowserRouter, 
} from "react-router-dom";



const queryClient = new QueryClient()

//import { disableReactDevTools } from "@fvilers/disable-react-devtools";

/* if (process.env.NODE_ENV === "production") disableReactDevTools(); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}> 
    <QueryClientProvider client={queryClient}>        
    <App />
      <ReactQueryDevtools initialIsOpen />     
      </QueryClientProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
