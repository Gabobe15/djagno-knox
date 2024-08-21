import Button from '@mui/material/Button';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';

import countryCodes from './Country';

const PhoneNumber = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			tel: 'KE',
		},
	});

	const onSubmit = (data) => {
		console.log(typeof data.tel.replace(/\s+/g, ''));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="tel"
				control={control}
				rules={{
					validate: (value) =>
						matchIsValidTel(value, { onlyCountries: countryCodes }),
				}}
				render={({
					field: { ref: fieldRef, value, ...fieldProps },
					fieldState,
				}) => (
					<MuiTelInput
						{...fieldProps}
						value={value ?? ''}
						inputRef={fieldRef}
						onlyCountries={countryCodes}
						defaultCountry="KE"
						helperText={fieldState.invalid ? 'Tel is invalid' : ''}
						error={fieldState.invalid}
					/>
				)}
			/>
			<div>
				<Button type="submit" variant="contained" sx={{ mt: 2 }}>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default PhoneNumber;
