import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  filters: { categories: ["All"], countries: ["All"] },
  usdToAedRate: 3.67,
  currency: "USD",
  location: "freezone",
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {

    clearFilters : (state,action) => {
      state.filters = { categories: ["All"], countries: ["All"] };
      state.currency = "USD";
      state.location = "freezone";
    },

    setFiltersState: (state, action) => {
      state.filters = action.payload;
    },
    setUsdToAedRate(state, action) {
      state.usdToAedRate = action.payload;
    },
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
    changeLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setFiltersState, setUsdToAedRate, changeCurrency, changeLocation ,clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
