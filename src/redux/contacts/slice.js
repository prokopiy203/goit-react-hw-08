import { createSlice } from "@reduxjs/toolkit";
import {
  addContacts,
  deleteContacts,
  fetchContacts,
  updateContacts,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContacts.pending, handlePending)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContacts.rejected, handleRejected)
      .addCase(updateContacts.pending, handlePending)
      .addCase(updateContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updateContact = action.payload;
        state.items = state.items.map((contact) =>
          contact.id === updateContact.id ? updateContact : contact
        );
      })
      .addCase(updateContacts.rejected, handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
