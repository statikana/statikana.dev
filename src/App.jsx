import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from "./components/Card";
import Resources from './components/Resources';
import Snake from './components/Snake';
import Chat from './components/Chat';

function App() {
	return (
		<Router basename="/">
			<Routes>
				<Route path="/" element={<Card />} />
				<Route path="/Resources" element={<Resources />} />
				<Route path="/Snake" element={<Snake />} />
				<Route path="/Chat" element={<Chat />} />
			</Routes>
		</Router>
	);
}

export default App;
