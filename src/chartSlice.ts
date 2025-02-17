import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartState {
  variablesVisible: {
    uv: boolean;
    pv: boolean;
    amt: boolean;
  };
}

const initialState: ChartState = {
  variablesVisible: { uv: true, pv: true, amt: true },
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    toggleVariable: (state, action: PayloadAction<keyof ChartState['variablesVisible']>) => {
      state.variablesVisible[action.payload] = !state.variablesVisible[action.payload];
    },
  },
});

export const { toggleVariable } = chartSlice.actions;
export default chartSlice.reducer;
