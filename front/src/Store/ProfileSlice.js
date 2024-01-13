import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async (infos) => {
		const token = localStorage.getItem("token");

		const request = await axios
			.put("http://localhost:3001/api/v1/user/profile", infos, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => response.data)
			.catch((err) => console.log("err", err));

		return request;
	}
);

export const userProfile = createAsyncThunk("profile/takeProfile", async () => {
	const token = localStorage.getItem("token");

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const request = await axios
		.post("http://localhost:3001/api/v1/user/profile", { token }, config)
		.then((res) => res.data)
		.catch((err) => console.log("Error: ", err));

	return request;
});

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		loading: false,
		profile: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(userProfile.pending, (state) => {
				state.loading = true;
				state.profile = null;
				state.error = null;
			})
			.addCase(userProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
				state.error = null;
			})

			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.profile = null;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
				state.error = null;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.profile = null;
				console.log(action.error.message);
				if (
					action.error.message ===
					"Request failed with status code 401"
				) {
					state.error = "Can not update profile";
				} else {
					state.error = action.error.message;
				}
			});
	},
});

export default profileSlice;
