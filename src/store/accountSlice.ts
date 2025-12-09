import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: string;
  type: string;
  lastFourDigits: string;
  expiryDate: string;
}

interface AccountState {
  balance: number;
  cards: Card[];
}

const initialState: AccountState = {
  balance: 5000.75, // Initial simulated balance
  cards: [
    { id: 'card1', type: 'Visa', lastFourDigits: '1234', expiryDate: '12/25' },
    { id: 'card2', type: 'Mastercard', lastFourDigits: '5678', expiryDate: '08/24' },
  ],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
  },
});

export const { updateBalance } = accountSlice.actions;
export default accountSlice.reducer;