// store.ts
import { createStore, action } from 'easy-peasy';
import { StoreModel } from './type';

const store = createStore<StoreModel>({
  locale: 'en',
  setLocale: action((state, payload) => {
    state.locale = payload;
  }),
});

export default store;