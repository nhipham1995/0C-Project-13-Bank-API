import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async (infos) => {
		// const userState = store?.getState();
		// const token = userState?.user?.user?.body?.token;
		const token = localStorage.getItem("token");
		// console.log("edit profile: ", infos);

		const request = await axios
			.put("http://localhost:3001/api/v1/user/profile", infos, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => response.data)
			.catch((err) => console.log("err", err));
		// const response = await request.data;
		// console.log(response);
		// localStorage.setItem("user", JSON.stringify(response));
		// return response;
		return request;
	}
);

export const userProfile = createAsyncThunk("profile/takeProfile", async () => {
	const token = localStorage.getItem("token");

	// try {
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
	// dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	// }
	// catch (error) {
	// dispatch({
	// 	type: USER_PROFILE_FAIL,
	// 	payload:
	// 		error.response && error.response.data.message
	// 			? error.response.data.message
	// 			: error.message,
	// });
	// }
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
			// .addCase(userProfile.rejected, (state, action) => {
			// 	state.loading = false;
			// 	state.profile = null;
			// 	console.log(action.error.message);
			// 	if (
			// 		action.error.message ===
			// 		"Request failed with status code 401"
			// 	) {
			// 		state.error = "Can not load profile";
			// 	} else {
			// 		state.error = action.error.message;
			// 	}
			// })
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
