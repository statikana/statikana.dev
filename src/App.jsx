import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from "./components/Card";
import Resources from './components/Resources';
import Snake from './components/Snake';

function App() {
	return (
		<Router basename="/src">
			<Routes>
				<Route path="/" element={<Card />} />
				<Route path="/resources" element={<Resources />} />
				<Route path="/snake" element={<Snake />} />
			</Routes>
		</Router>
	);
}

export default App;
