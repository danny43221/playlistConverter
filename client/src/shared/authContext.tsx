import React, { useState, createContext, useContext } from "react";

interface IAuthContext {
	spotifyAuth: boolean;
	setSpotifyAuth: React.Dispatch<React.SetStateAction<boolean>>;
	appleAuth: boolean;
	setAppleAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext>({
	spotifyAuth: false,
	appleAuth: false,
	setSpotifyAuth: () => console.log("No provider"),
	setAppleAuth: () => console.log("No provider")
});

export const AuthProvider: React.FC = ({ children }) => {
	const [spotifyAuth, setSpotifyAuth] = useState(false);
	const [appleAuth, setAppleAuth] = useState(false);

	return (
		<AuthContext.Provider value={{ spotifyAuth, appleAuth, setSpotifyAuth, setAppleAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
