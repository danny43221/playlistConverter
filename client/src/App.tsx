import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "./shared/authContext";
import ConvertApple from "./components/ConvertApple";
import Login from "./components/Login";

const App = () => {
	const { spotifyAuth, setSpotifyAuth } = useAuth();

	const routes = (
		<Switch>
			<Route path="/convert-apple" component={ConvertApple} />
			<Route path="/" component={Login} />
		</Switch>
	);
	return <div className="App">{routes}</div>;
};

export default App;
