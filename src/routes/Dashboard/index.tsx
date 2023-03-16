import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useTheme, Stack, Box, Container, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout, Home, Movie, Settings, AutoGraph, Person } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

import { useAuth } from "../../contexts/auth";
import { Avatar } from "../../components";
import { Logo } from "../../components";
import Analysis from "./analysis";
import Video from "./videos";

const SideBarRoutes = [
	{ title: "Overview", icon: <Home />, uri: "/dashboard" },
	{ title: "Profile", icon: <Person />, uri: "/dashboard/profile" },
	{ title: "Video", icon: <Movie />, uri: "/dashboard/video" },
	{ title: "Analysis", icon: <AutoGraph />, uri: "/dashboard/analysis" },
	{ title: "Settings", icon: <Settings />, uri: "/dashboard/settings" },
];

const Dashboard = () => {
	const auth = useAuth();
	const theme = useTheme();
	const navigate = useNavigate();
	const [state, setState] = React.useState(false);

	const list = () => (
		<Box sx={{ width: "100%" }} role="presentation">
			<Logo href="/" style={{ height: 20, marginTop: theme.spacing(5), margin: theme.spacing(3) }} />
			<List>
				{SideBarRoutes.map(({ title, icon, uri }) => (
					<ListItem key={title} disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(uri);
							}}
							sx={{
								bgcolor: window.location.pathname === uri ? indigo["800"] : "transparent",
								color: window.location.pathname === uri ? theme.palette.text.primary : theme.palette.text.secondary,
							}}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<List style={{ marginTop: theme.spacing(16) }}>
				<ListItem key={"logout"} disablePadding onClick={auth.signout}>
					<ListItemButton>
						<ListItemIcon>
							{" "}
							<Logout />
						</ListItemIcon>
						<ListItemText primary={"Log out"} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<div
			style={{
				padding: theme.spacing(4),
				minHeight: "100vh",
				backgroundColor: "black",
				color: theme.palette.text.primary,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			{/* {list()} */}
			<Drawer
				anchor={"left"}
				variant="permanent"
				sx={{
					width: "20%",
					maxWidth: 240,
					minWidth: 180,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: "20%",
						maxWidth: 240,
						minWidth: 180,
						boxSizing: "border-box",
					},
				}}
			>
				{list()}
			</Drawer>
			<Box sx={{ flexGrow: 1 }}>
				{/* <Container maxWidth="lg" sx={{ pd: 0 }}>
					<Stack direction="row-reverse" justifyContent="flex-start" alignItems="center" spacing={0}>
						<Avatar size={60} />
					</Stack>
				</Container> */}
				<Routes>
					<Route path="/analysis/*" element={<Analysis />} />
					<Route path="/video/*" element={<Video />} />
				</Routes>
			</Box>
		</div>
	);
};

export default Dashboard;
