import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Component
import LayoutWrapper from "./screen/layouts";
// Util
import Router from "./router";
import store from "./redux/store";
import "./App.css";


function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <LayoutWrapper>
            <Router></Router>
          </LayoutWrapper>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
