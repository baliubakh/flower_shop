import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { LocalStorageKeys } from "@/src/constants";

type TAuthState = {
  access_token: string | null;
  refresh_token: string | null;
};

type TAuthPayload = {
  access_token: string;
  refresh_token: string;
};

const slice = createSlice({
  name: "auth",
  initialState: { access_token: null, refresh_token: null } as TAuthState,
  reducers: {
    setAuthData: (
      state,
      { payload: { access_token, refresh_token } }: PayloadAction<TAuthPayload>
    ) => {
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      localStorage.setItem(LocalStorageKeys.access, access_token);
      localStorage.setItem(LocalStorageKeys.refresh, refresh_token);
    },

    logOut: (state) => {
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setAuthData, logOut } = slice.actions;

export default slice.reducer;

export const getCurrentTokens = (state: RootState) => state.auth;
