// import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");
// const user = localStorage.getItem("user");

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     token: token || null,
//     role: role || null,
//     user: user ? JSON.parse(user) : null,
//     isAuthenticated: !!token,
//     loading: false,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//     },

//     loginSuccess: (state, action) => {
//       const { token, role, user } = action.payload;

//       state.token = token;
//       state.role = role;
//       state.user = user;
//       state.isAuthenticated = true;
//       state.loading = false;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("user", JSON.stringify(user));
//     },

//     logout: (state) => {
//       state.token = null;
//       state.role = null;
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;

//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { loginStart, loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null,
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  loading: false
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;

      //localStorage.clear();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
