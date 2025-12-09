import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import transactionReducer from './transactionSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;