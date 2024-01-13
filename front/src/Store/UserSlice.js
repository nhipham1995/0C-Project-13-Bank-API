import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (userCredentials, remember) => {
		const request = await axios.post(
			"http://localhost:3001/api/v1/user/login",
			userCredentials
		);
		const response = await request.data;

		return response;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		user: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.user = null;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				localStorage.setItem("token", action.payload.body.token);
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				console.log(action.error.message);
				if (
					action.error.message ===
					"Request failed with status code 401"
				) {
					state.error = "Access Denied! Invalid Information";
				} else {
					state.error = action.error.message;
				}
			});
	},
});

export default userSlice;
