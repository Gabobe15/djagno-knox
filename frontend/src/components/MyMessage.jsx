import { Box } from '@mui/material';

const MyMessage = ({ text, colors }) => {
	return (
		<Box
			sx={{
				backgroundColor: colors,
				color: '#FFF',
				height: '40px',
				width: '90%',
				position: 'absolute',
				top: '20px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
			}}
		>
			{text}
		</Box>
	);
};

export default MyMessage;
