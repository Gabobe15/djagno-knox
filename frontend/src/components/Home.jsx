import { useState, useEffect } from 'react';
import AxiosInstance from './AxiosInstance';
import { Box, Typography } from '@mui/material';


const Home = () => {
	const [myData, setMyData] = useState();
	const [Id, setId] = useState();

	const [loading, setLoading] = useState(true);
	// let Token = localStorage.getItem('Token')

	const GetData = () => {
		AxiosInstance.get(`users/`).then((res) => {
			setMyData(res.data);
			setLoading(false);
		});
		AxiosInstance.get(`user/`).then((res) => {
			localStorage.setItem('Role', res.data.role);
			setId(localStorage.setItem('Id', res.data.id));
			localStorage.setItem('name', res.data.first_name);
			setLoading(false);
		});
	};

	useEffect(() => {
		GetData();
	}, [Id]);

	return (
		<div>
			{loading ? (
				<p>Loading data ....</p>
			) : (
				<>
					<Typography variant="h5">
						Welcome{' '}
						{localStorage
							.getItem('name')
							?.toLowerCase()
							.split(' ')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ')}
					</Typography>
					<div>
						{myData &&
							myData.map((item) => (
								<Box key={item.id} sx={{ p: 3, m: 2, boxShadow: 3 }}>
									<div>
										Full name:{' '}
										{`${item.first_name
											?.toLowerCase()
											.split(' ')
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
											.join(' ')} ${item.last_name
											?.toLowerCase()
											.split(' ')
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
											.join(' ')}`}
									</div>
									<div>Email: {item.email}</div>
									<div>Phone number: {item.tel_no}</div>
									<div>
										Country:{' '}
										{item.country
											?.toLowerCase()
											.split(' ')
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
											.join(' ')}
									</div>
								</Box>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;

// moment(item.created_at).format('MMMM DD YYYY, h:mm:ss'); --getting date and time using moment library
// at {moment(item.created_at, 'HH:mm').format('h:mm A')} - 12 hours system
