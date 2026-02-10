import { createSlice } from "@reduxjs/toolkit";

/* ================= SAFE LOCAL STORAGE READ ================= */
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined" || user === "null") return null;
    return JSON.parse(user);
  } catch (err) {
    console.warn("Corrupted user in localStorage removed");
    localStorage.removeItem("user");
    return null;
  }
};

const getStoredToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

const getStoredRole = () => {
  const role = localStorage.getItem("role");
  return role && role !== "undefined" ? role : null;
};

/* ================= INITIAL STATE ================= */
const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  role: getStoredRole(),
  loading: false,
  isAuthenticated: !!getStoredToken(),
};

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* ---------- LOGIN START ---------- */
    loginStart: (state) => {
      state.loading = true;
    },

    /* ---------- LOGIN SUCCESS ---------- */
    loginSuccess: (state, action) => {
      const { token, role, user } = action.payload;

      state.loading = false;
      state.token = token;
      state.role = role;
      state.user = user || null;
      state.isAuthenticated = true;

      // Save safely
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },

    /* ---------- LOGOUT ---------- */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
