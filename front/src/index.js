import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()

//import { disableReactDevTools } from "@fvilers/disable-react-devtools";

/* if (process.env.NODE_ENV === "production") disableReactDevTools(); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    <QueryClientProvider client={queryClient}>        
      <BrowserRouter>      
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>  
        <ReactQueryDevtools initialIsOpen />
      </BrowserRouter>     
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
