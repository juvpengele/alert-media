import { Provider } from 'react-redux';
import Routes from "./routes";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import store from './store';


function App() {
  return ( 
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>

  );
}

export default App;
