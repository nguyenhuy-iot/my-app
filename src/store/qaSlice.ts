

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QAItem } from './type';

type  QAState = {
  qaList: QAItem[];
}

const initialState: QAState = {
  qaList: [],
};

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    addQA: (state, action: PayloadAction<QAItem>) => {
      state.qaList.push(action.payload);
    },
    removeQA: (state, action: PayloadAction<number>) => {
      state.qaList.splice(action.payload, 1);
    },
  },
});

export const { addQA, removeQA } = qaSlice.actions;
export default qaSlice.reducer;