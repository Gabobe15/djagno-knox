import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';

export function MySelectField({ label, name, control, defaultValue, options }) {
	return (
		<FormControl
			variant="outlined"
			className="myFormControl"
			sx={{ width: '100%', flexGrow: 1 }}
		>
			<InputLabel id={`${name}-label`}>{label}</InputLabel>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field, fieldState: { error } }) => (
					<>
						<Select
							{...field}
							labelId={`${name}-label`}
							id={`${name}-select`}
							label={label}
							error={!!error}
							sx={{ width: '100%' }}
						>
							{options.map((option, index) => (
								<MenuItem key={index} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
						{error && (
							<FormHelperText
								sx={{
									color: '#d32f2f',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								{error.message}
							</FormHelperText>
						)}
					</>
				)}
			/>
		</FormControl>
	);
}
