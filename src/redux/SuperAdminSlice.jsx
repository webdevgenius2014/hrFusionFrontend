import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  status: "",
  token: "",
};

export const superAdminSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    superAdminData: (state, action) => {
      // console.log(" redux super admin loged in");
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.status = action.payload.status;
      state.token = action.payload.token;
    },
    superAdminLogout:(state,action) => {
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      state.role = undefined;
      state.status = undefined;
      state.token = undefined;
      sessionStorage.clear();
      localStorage.clear();
      // persistor.purge();
    } ,

    
  },
});

// Action creators are generated for each case reducer function
export const { superAdminData, superAdminLogout } = superAdminSlice.actions;

export default superAdminSlice.reducer;
