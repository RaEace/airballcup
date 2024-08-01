import { Action } from "easy-peasy";

export interface StoreModel {
    locale: string;
    setLocale: Action<StoreModel, string>;
  }