import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MyThemeProvider } from "./context/MyThemeProvider";


const queryClient = new QueryClient()

//import { disableReactDevTools } from "@fvilers/disable-react-devtools";

/* if (process.env.NODE_ENV === "production") disableReactDevTools(); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
          <MyThemeProvider>     
            <App/>
          </MyThemeProvider>    
          <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Provider>
    
  </React.StrictMode>
);
