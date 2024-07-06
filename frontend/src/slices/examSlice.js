import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examIsRandom: true,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamIsRandom: (state, action) => {
      state.examIsRandom = action.payload;
    },
  },
});

export const { setExamIsRandom } = examSlice.actions;

export default examSlice.reducer;
