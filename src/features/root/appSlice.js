import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultPost: {
    data: {},
  },
  postId: 1,
  showModal: {
    modal: false,
  },
  edit: {
    data: {},
  },
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    actionResetState: () => initialState,
    actionPostId: (state, action) => {
      state.postId = action.payload;
    },
    actionShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    actionEdit: (state, action) => {
      state.edit = action.payload;
    },
    actionDefaultPost: (state, action) => {
      state.defaultPost = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { actionPostId, actionShowModal, actionEdit, actionDefaultPost } =
  appSlice.actions;

export default appSlice.reducer;
