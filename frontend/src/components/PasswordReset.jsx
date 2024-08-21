import { Box, IconButton } from '@mui/material';
import '../App.css';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import AxiosInstance from './AxiosInstance';
import MyMessage from './MyMessage';


// third party
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PasswordReset = () => {
	const [message, setMessage] = useState(false);
	const { token } = useParams();
	const navigate = useNavigate();

	const schema = yup.object({
		password: yup
			.string()
			.required('Password field is required')
			.min(8, 'Password must contain at least 8 characters')
			.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.matches(/[a-z]/, 'Password must contain at least one lower letter')
			.matches(/[0-9]/, 'Password must contain at least one number')
			.matches(
				/[#&@!.]/,
				'Password must contain at least one special character  #&!@.'
			),
		password2: yup
			.string()
			.required('Password confirmation is required field')
			.oneOf([yup.ref('password'), null], 'password must match'),
	});

	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
	});

	const submission = (data) => {
		AxiosInstance.post(`api/password_reset/confirm/`, {
			password: data.password,
			token: token,
		}).then(() => {
			setMessage(true);
			console.log(token);

			setTimeout(() => {
				navigate(`/`);
			}, 3000);
		});
	};

	return (
		<div className="myBackground">
			{message ? (
				<MyMessage text={'Password reset successfully!!'} colors={'#69c9AB'} />
			) : null}
			<form onSubmit={handleSubmit(submission)}>
				<Box className="whiteBox">
					<Box className="itemBox">
						<Box className="title">
							Password reset
						</Box>
					</Box>

					<Box className="itemBox">
						<MyPassField
							name={'password'}
							control={control}
							label={'Password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyPassField
							name={'password2'}
							control={control}
							label={'Confirm password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyButton type={'submit'} label={'Reset password'} />
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default PasswordReset;
