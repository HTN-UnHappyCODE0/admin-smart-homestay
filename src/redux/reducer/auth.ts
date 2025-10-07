import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IDataLoginStorage {
	usernameStorage: string;
	passwordStorage: string;
}

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isLogin: boolean;
	dataLoginStorage: IDataLoginStorage | null;
}

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	isLogin: false,
	dataLoginStorage: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string | null>) => {
			state.accessToken = action?.payload;
		},
		setRefreshToken: (state, action: PayloadAction<string | null>) => {
			state.refreshToken = action?.payload;
		},
		setStateLogin: (state, action: {payload: boolean}) => {
			state.isLogin = action?.payload;
		},
		logout: (state) => {
			state.isLogin = false;
			state.accessToken = null;
			state.refreshToken = null;
		},
		setDataLoginStorage: (state, action: PayloadAction<IDataLoginStorage | null>) => {
			state.dataLoginStorage = action?.payload;
		},
	},
});

export const {setAccessToken, setRefreshToken, setStateLogin, logout, setDataLoginStorage} = authSlice.actions;
export default authSlice.reducer;
