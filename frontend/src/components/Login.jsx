import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import '../App.css';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import AxiosInstance from './AxiosInstance';

// third party
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// icons
import LoginIcon from '@mui/icons-material/Login';
import MyMessage from './MyMessage';

const Login = () => {
	// const navigate = useNavigate();
	const [showMessage, setMessage] = useState(false);

	const schema = yup.object({
		email: yup
			.string()
			.email('Field expect email address')
			.required('Email field is required'),
		sex: yup.string().required('sex field is required'),
		role: yup.string().required('role field is required'),
		password: yup.string().required('Password field is required'),
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
				// localStorage.setItem('Token', response.data.token);
				// localStorage.setItem('Email', response.data.user.email);
				// navigate(`/home`);
				console.log(response.data);
				
			})
			.catch(() => {
				setMessage(true);
			});
	};

	return (
		<div className="myBackground">
			{showMessage ? (
				<MyMessage
					text={'Link has been sent to email account reset your password'}
					colors={'#69c9AB'}
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
