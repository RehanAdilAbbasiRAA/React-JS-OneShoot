import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTemplates } from "./templatesAPI";

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    const response = await getTemplates();
    return response;
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default templatesSlice.reducer;
