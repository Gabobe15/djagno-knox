import {
	Home,
	Register,
	Login,
	Navbar,
	About,
	PasswordResetRequest,
	PasswordReset,
	AdminRegistration,
	ChangePassword,
	PhoneNumber,
} from './components';
import './App.css';
import ProtectedRoute from './components/ProtectedRoutes';

// third party
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
	const location = useLocation();
	const noNavbar =
		location.pathname === '/' ||
		location.pathname === '/select' ||
		location.pathname === '/radio' ||
		location.pathname === '/register' ||
		location.pathname === '/admin-register' ||
		location.pathname.includes('password')
		location.pathname === '/phone';

	return (
		<>
			{noNavbar ? (
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/phone" element={<PhoneNumber />} />
					<Route path="/admin-register" element={<AdminRegistration />} />
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
								<Route path="/change-password" element={<ChangePassword />} />
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
