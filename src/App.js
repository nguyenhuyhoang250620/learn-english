import {Provider} from 'react-redux';

// Util
import store from './redux/store';
import './App.css';
import Router from './router';
import {BrowserRouter} from 'react-router-dom';
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Router/>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
