import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IUser {
	code: string;
	name: string;
	type: number;
	id: number;
	uuid: string;
	status: number;
}

export interface UserState {
	infoUser: IUser | null;
}

const initialState: UserState = {
	infoUser: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoUser: (state, action: PayloadAction<IUser | null>) => {
			state.infoUser = action?.payload;
		},
	},
});

export const {setInfoUser} = userSlice.actions;
export default userSlice.reducer;
