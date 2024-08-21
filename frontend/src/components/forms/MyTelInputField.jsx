import { FormControl, FormHelperText } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller } from 'react-hook-form';
import countryCodes from '../Country';

export function MyTelInputField({
	name,
	control,
	defaultValue,
	label,
	rules,
	onlyCountries = countryCodes,
	defaultCountry = 'KE',
}) {
	return (
		<FormControl variant="outlined" sx={{ width: '100%' }}>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={rules}
				render={({
					field: { ref: fieldRef, value, ...fieldProps },
					fieldState,
				}) => (
					<>
						<MuiTelInput
							{...fieldProps}
							value={value ?? ''}
							inputRef={fieldRef}
							onlyCountries={onlyCountries}
							defaultCountry={defaultCountry} // Set default country to "KE"
							error={fieldState.invalid}
							helperText={fieldState.invalid ? `${label} is invalid` : ''}
							label={label}
							fullWidth
						/>
						{fieldState.invalid && (
							<FormHelperText>{`${label} is invalid`}</FormHelperText>
						)}
					</>
				)}
			/>
		</FormControl>
	);
}
