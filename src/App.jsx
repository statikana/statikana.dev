import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from "./components/Card";
import Resources from './components/Resources';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Card />} />
				<Route path="/resources" element={<Resources />} />
			</Routes>
		</Router>
	);
}

export default App;
