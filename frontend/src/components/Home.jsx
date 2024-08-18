import { useState, useEffect, useMemo } from 'react';
import AxiosInstance from './AxiosInstance';
import { Box, Typography } from '@mui/material';

import moment from 'moment';

const Home = () => {
	const [myData, setMyData] = useState();
	const [loading, setLoading] = useState(true);

	const GetData = () => {
		AxiosInstance.get(`users/`).then((res) => {
			setMyData(res.data);
			console.log(res.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		GetData();
	}, []);

	return (
		<div>
			{loading ? (
				<p>Loading data ....</p>
			) : (
				<div>
					{myData &&
						myData.map((item) => (
							<Box key={item.id} sx={{ p: 3, m: 2, boxShadow: 3 }}>
								<div>ID: {item.id}</div>
								<div>Full name: {`${item.first_name} ${item.last_name}`}</div>
								<div>Email: {item.email}</div>
								<div>Sex: {item.sex}</div>
								<div>Role: {item.role}</div>
								<div>
									Date joined:
									{moment(item.created_at).format('MMMM DD YYYY')}
								</div>
							</Box>
						))}
				</div>
			)}
		</div>
	);
};

export default Home;

// moment(item.created_at).format('MMMM DD YYYY, h:mm:ss'); --getting date and time using moment library
// at {moment(item.created_at, 'HH:mm').format('h:mm A')} - 12 hours system
