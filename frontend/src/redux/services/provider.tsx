"use client";

import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { store } from "./store";

export const Providers = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
