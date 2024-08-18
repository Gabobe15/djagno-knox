import { Box } from '@mui/material';
import '../App.css';
import MyTextField from './forms/MyTextField';
import MyButton from './forms/MyButton';
import AxiosInstance from './AxiosInstance';

// third party
import { useForm } from 'react-hook-form';
import MyMessage from './MyMessage';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PasswordResetRequest = () => {
	const [message, setMessage] = useState(false);

	const schema = yup.object({
		email: yup
			.string()
			.email('Field expect email address')
			.required('Email field is required'),
	});

	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
	});

	const submission = (data) => {
		AxiosInstance.post(`api/password_reset/`, {
			email: data.email,
		}).then(() => {
			setMessage(true);
		});
	};
	return (
		<div className="myBackground">
			{message ? (
				<MyMessage
					text={'Link has been sent to email account reset your password'}
					colors={'#69c9AB'}
				/>
			) : null}

			<form onSubmit={handleSubmit(submission)}>
				<Box className="whiteBox">
					<Box className="itemBox">
						<Box className="title">Request password reset</Box>
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
						<MyButton type={'submit'} label={'Request password reset'} />
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default PasswordResetRequest;
