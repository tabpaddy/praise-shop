import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
name: "search",
initialState: {
    searchTerm: "",
    result: [],
},
reducers: {
    setSearchTerm: (state, action) => {
    state.searchTerm = action.payload;
    },
    setResult: (state, action) => {
    state.result = action.payload || [];
    },
},
});

export const {
    setSearchTerm, setResult
} = SearchSlice.actions;

export default SearchSlice.reducer;