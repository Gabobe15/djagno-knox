import {
	Home,
	Register,
	Login,
	Navbar,
	About,
	PasswordResetRequest,
	PasswordReset,
} from './components';
import './App.css';
import ProtectedRoute from './components/ProtectedRoutes';

// third party
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
	const location = useLocation();
	const noNavbar =
		location.pathname === '/' ||
		location.pathname === '/register' ||
		location.pathname.includes('password');
	return (
		<>
			{noNavbar ? (
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/request/password_reset"
						element={<PasswordResetRequest />}
					/>
					<Route path="/password-reset/:token" element={<PasswordReset />} />
				</Routes>
			) : (
				<Navbar
					content={
						<Routes>
							<Route element={<ProtectedRoute />}>
								<Route path="/home" element={<Home />} />
								<Route path="/about" element={<About />} />
							</Route>
						</Routes>
					}
				/>
			)}
		</>
	);
}

export default App;
