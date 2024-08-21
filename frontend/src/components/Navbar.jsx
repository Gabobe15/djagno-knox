import {
	Box,
	Drawer,
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
} from '@mui/material';

import { RiLockPasswordFill } from 'react-icons/ri';

// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

// react-router-dom
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import AxiosInstance from './AxiosInstance';

const drawerWidth = 240;

const Navbar = (props) => {
	const navigate = useNavigate();
	const { content } = props;
	const location = useLocation();
	const path = location.pathname;

	const LogoutUser = () => {
		AxiosInstance.post(`logoutall/`, {}).then(() => {
			localStorage.removeItem('Token');
			localStorage.removeItem('Email');
			navigate('/');
		});
	};
	const LogoutAllUsers = () => {
		AxiosInstance.post(`logoutall/`, {}).then(() => {
			localStorage.removeItem('Token');
			localStorage.removeItem('role');
			navigate('/');
		});
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Clipped drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						<ListItem key={1} disablePadding>
							<ListItemButton
								component={NavLink}
								to="/home"
								selected={'/home' === path}
							>
								<ListItemIcon>{<HomeIcon />}</ListItemIcon>
								<ListItemText primary={'Home'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={2} disablePadding>
							<ListItemButton
								component={NavLink}
								to="/about"
								selected={'/about' === path}
							>
								<ListItemIcon>{<InfoIcon />}</ListItemIcon>
								<ListItemText primary={'About'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={3} disablePadding>
							<ListItemButton
								to="/change-password"
								selected={'/change-password' === path}
							>
								<ListItemIcon>
									<RiLockPasswordFill />
								</ListItemIcon>
								<ListItemText primary={'Change password'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={4} disablePadding>
							<ListItemButton component={NavLink} onClick={LogoutUser}>
								<ListItemIcon>{<LogoutIcon />}</ListItemIcon>
								<ListItemText primary={'Logout'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={5} disablePadding>
							<ListItemButton component={NavLink} onClick={LogoutAllUsers}>
								<ListItemIcon>{<LogoutIcon />}</ListItemIcon>
								<ListItemText primary={'Logout All'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{content}
			</Box>
		</Box>
	);
};

export default Navbar;
