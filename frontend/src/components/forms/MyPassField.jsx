import * as React from 'react';
import {
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from 'react-hook-form';

import '../../App.css';
import { FormHelperText } from '@mui/material';

export default function MyPassField(props) {
	const { label, name, control } = props;
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<FormControl className="myForm" variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						onChange={onChange}
						value={value}
						error={!!error}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label={label}
					/>
					<FormHelperText sx={{ color: '#d32f2f' }}>
						{error?.message}
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
}
