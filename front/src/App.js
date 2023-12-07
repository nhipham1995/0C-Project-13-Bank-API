import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							// <DataContextProvider>
							<HomePage />
							// </DataContextProvider>
						}
					></Route>
					<Route
						path="/login"
						element={
							// <DataContextProvider>
							<Login />
							// </DataContextProvider>
						}
					></Route>
					<Route
						path="/profil"
						element={
							// <DataContextProvider>
							<Profil />
							// </DataContextProvider>
						}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
