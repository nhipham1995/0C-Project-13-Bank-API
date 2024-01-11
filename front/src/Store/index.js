import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import profileSlice from "./ProfileSlice";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		profile: profileSlice.reducer,
	},
});

export default store;
