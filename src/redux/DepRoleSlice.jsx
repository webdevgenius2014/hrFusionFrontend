import { createSlice } from "@reduxjs/toolkit";
const initialState = {
 role:'',
 department:'',
};

export const DepRoleSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    RoleData: (state, action) => {
      state.role = action?.payload;
    },
    DepData: (state, action) => {
      state.department =action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { RoleData, DepData} = DepRoleSlice.actions;

export default DepRoleSlice.reducer;
