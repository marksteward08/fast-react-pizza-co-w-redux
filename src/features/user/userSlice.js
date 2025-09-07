import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

async function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  const currentPosition = await getPosition();
  const position = {
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj.principalSubdivision} ${addressObj.city}, ${addressObj.postcode}, ${addressObj.countryName}`;

  // payload of the fulfilled state
  return { position, address };
});

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }),
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
