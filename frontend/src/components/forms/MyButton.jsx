import Button from '@mui/material/Button';
import '../../App.css';

export default function MyButton(props) {
	const { label, type } = props;
	return (
		<Button type={type} variant="contained" className="myForm">
			{label}
		</Button>
	);
}
