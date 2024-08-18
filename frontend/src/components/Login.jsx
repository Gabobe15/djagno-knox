import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import '../App.css';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import AxiosInstance from './AxiosInstance';

// third party
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// icons
import LoginIcon from '@mui/icons-material/Login';
import MyMessage from './MyMessage';

const Login = () => {
	const navigate = useNavigate();
	const [showMessage, setMessage] = useState(false);

	const schema = yup.object({
		email: yup
			.string()
			.email('Field expect email address')
			.required('Email field is required'),

		password: yup
			.string()
			.required('Password field is required')
			.min(8, 'Password should be a minimum of 8 characters'),
	});
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
	});

	const submission = (data) => {
		AxiosInstance.post(`login/`, {
			email: data.email,
			password: data.password,
		})
			.then((response) => {
				localStorage.setItem('Token', response.data.token);
				localStorage.setItem('Email', response.data.user.email);
				navigate(`/home`);
			})
			.catch((error) => {
				setMessage(true);
				console.log('error message due to', error);
			});
	};

	return (
		<div className="myBackground">
			{showMessage ? (
				<MyMessage
					text={
						'Invalid credentails, check your email and password or reset password'
					}
					colors={'#EC5A76'}
				/>
			) : null}
			<form onSubmit={handleSubmit(submission)}>
				<Box className="whiteBox">
					<Box className="itemBox">
						<Box className="title">
							<IconButton style={{ alignItems: 'center' }}>
								<LoginIcon />
							</IconButton>
							Login
						</Box>
					</Box>
					<Box className="itemBox">
						<MyTextField
							name={'email'}
							control={control}
							label={'Email'}
							variant="outlined"
						/>
					</Box>
					<Box className="itemBox">
						<MyPassField
							name={'password'}
							control={control}
							label={'Password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyButton type={'submit'} label={'Login'} />
					</Box>
					<Box
						className="itemBox"
						sx={{ display: 'flex', flexDirection: 'column' }}
					>
						<NavLink to="/register">No account yet? please register!</NavLink>
						<NavLink to="/request/password_reset">
							Request password reset
						</NavLink>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Login;
