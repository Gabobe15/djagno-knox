import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import '../App.css';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import AxiosInstance from './AxiosInstance';

// third party
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// icons
import LoginIcon from '@mui/icons-material/Login';
import MyMessage from './MyMessage';

const ChangePassword = () => {
	const navigate = useNavigate();
	const [showMessage, setMessage] = useState(false);

	const schema = yup.object({
		old_password: yup
			.string()
			.required('Password field is required')
			.min(8, 'Password should be a minimum of 8 characters'),
		new_password: yup
			.string()
			.required('Password field is required')
			.min(8, 'Password should be a minimum of 8 characters'),
		confirm_password: yup
			.string()
			.required('Password confirmation is required field')
			.oneOf([yup.ref('new_password'), null], 'password must match'),
	});
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
	});

	const submission = (data) => {
		AxiosInstance.post(`change-password/`, {
			user_id: localStorage.getItem('Id'),
			old_password: data.old_password,
			new_password: data.new_password,
		}).then(() => {
			navigate(`/home`);
		});
	};

	return (
		<div style={{width:'500px', margin:'50px auto' , border:'none'}}>
			{showMessage ? (
				<MyMessage text={'Old password is incorrect'} colors={'#EC5A76'} />
			) : null}
			<form onSubmit={handleSubmit(submission)}>
				<Box sx={{boxShadow:'5px 5px 5px grey, -5px -5px 5px grey', padding: '20px'}}>
					<Box className="itemBox">
						<Box className="title">
							<IconButton style={{ alignItems: 'center' }}>
								<LoginIcon />
							</IconButton>
							Change password
						</Box>
					</Box>

					<Box className="itemBox">
						<MyPassField
							name={'old_password'}
							control={control}
							label={'Old password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyPassField
							name={'new_password'}
							control={control}
							label={'New password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyPassField
							name={'confirm_password'}
							control={control}
							label={'Confirm new password'}
						/>
					</Box>
					<Box className="itemBox">
						<MyButton type={'submit'} label={'Change Password'} />
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default ChangePassword;
