import { Box, IconButton, Typography } from '@mui/material';
import '../App.css';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { MyRadioGroup } from './forms/MyRadio';
// import RadioButton from './forms/MyRadio';

import AxiosInstance from './AxiosInstance';

// third party
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HowToRegIcon from '@mui/icons-material/HowToReg';

// yub and resolver
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import countryCodes from './Country';
import { matchIsValidTel } from 'mui-tel-input';
import { MyTelInputField } from './forms/MyTelInputField';

const Register = () => {
	const navigate = useNavigate();

	const schema = yup.object({
		first_name: yup.string().required('First name is required field'),
		last_name: yup.string().required('last name is required field'),
		email: yup
			.string()
			.email('Field expect email address')
			.required('Email field is required'),
		sex: yup.string().required('sex field is required'),
		tel_no: yup.string().required('Phone number is required'),
		country: yup.string().required('Country is required'),
		// role: yup.string().required('role field is required'),
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

	const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });
	const submission = (data) => {
		AxiosInstance.post(`register/`, {
			first_name: data.first_name?.toLowerCase(),
			last_name: data.last_name?.toLowerCase(),
			email: data.email?.toLowerCase(),
			sex: data.sex,
			tel_no: data.tel_no.replace(/\s+/g, ''),
			country: data.country?.toLowerCase(),
			password: data.password,
		})
			.then((res) => {
				console.log(res.data);
				navigate('/');
			})
			.catch((error) => {
				console.log('Error in the registration', error);
			});
	};

	return (
		<div className="myBackground">
			<form onSubmit={handleSubmit(submission)}>
				<Box className="whiteBox">
					<Box className="itemBox">
						<Box className="title">
							{' '}
							<IconButton style={{ alignItems: 'center', marginRight: '5px' }}>
								<HowToRegIcon style={{ fontSize: '40px' }} />
							</IconButton>
							User registration
						</Box>
					</Box>
					<Box className="itemBox">
						<MyTextField
							label={'First Name'}
							name={'first_name'}
							control={control}
							variant="outlined"
						/>
					</Box>
					<Box className="itemBox">
						<MyTextField
							label={'Last Name'}
							control={control}
							name={'last_name'}
							variant="outlined"
						/>
					</Box>
					<Box className="itemBox">
						<MyTextField
							label={'Email'}
							name={'email'}
							control={control}
							variant="outlined"
						/>
					</Box>
					<Box className="itemBox">
						<MyTelInputField
							name={'tel_no'}
							control={control}
							defaultValue=""
							label={'Telephone'}
							rules={{
								validate: (value) =>
									matchIsValidTel(value, { onlyCountries: countryCodes }),
							}}
							defaultCountry="KE"
						/>
					</Box>
					<Box className="itemBox">
						<MyTextField
							label={'Country'}
							control={control}
							name={'country'}
							variant="outlined"
						/>
					</Box>
					<Box className="itemBox">
						<Typography
							sx={{
								marginRight: '10px',
								fontSize: '20px',
								marginLeft: '-15px',
							}}
						>
							Sex:
						</Typography>
						<MyRadioGroup
							label="Sex"
							name="sex"
							control={control}
							defaultValue=""
							options={[
								{ label: 'Female', value: 'female' },
								{ label: 'Male', value: 'male' },
							]}
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
						<MyPassField
							label={'Confirm password'}
							name={'password2'}
							control={control}
						/>
					</Box>
					<Box className="itemBox">
						<MyButton label={'Register'} type="submit" />
					</Box>
					<Box className="itemBox">
						<NavLink to="/">Already have account? please login!</NavLink>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Register;
