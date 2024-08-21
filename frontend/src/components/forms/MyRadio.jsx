import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Box,
	Radio,
	FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';

export function MyRadioGroup({ label, name, control, defaultValue, options }) {
	return (
		<FormControl component="fieldset">
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field, fieldState: { error } }) => (
					<RadioGroup {...field}>
						<Box sx={{ display: 'flex', columnGap: '10px' }}>
							{options.map((option, index) => (
								<FormControlLabel
									key={index}
									value={option.value}
									control={<Radio />}
									label={option.label}
									error={!!error}
								/>
							))}
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
						</Box>
					</RadioGroup>
				)}
			/>
		</FormControl>
	);
}
