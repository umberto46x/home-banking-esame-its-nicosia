import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [
    { id: 't1', date: '2023-10-26', description: 'Stipendio', amount: 2500.00, type: 'deposit' },
    { id: 't2', date: '2023-10-25', description: 'Spesa supermercato', amount: -75.50, type: 'withdrawal' },
    { id: 't3', date: '2023-10-24', description: 'Bonifico ricevuto', amount: 150.00, type: 'deposit' },
    { id: 't4', date: '2023-10-23', description: 'Ristorante', amount: -45.00, type: 'withdrawal' },
    { id: 't5', date: '2023-10-22', description: 'Affitto', amount: -800.00, type: 'transfer' },
    { id: 't6', date: '2023-10-21', description: 'Abbonamento palestra', amount: -30.00, type: 'withdrawal' },
    { id: 't7', date: '2023-10-20', description: 'Rimborso acquisto', amount: 25.00, type: 'deposit' },
    { id: 't8', date: '2023-10-19', description: 'Benzina', amount: -60.00, type: 'withdrawal' },
    { id: 't9', date: '2023-10-18', description: 'Regalo compleanno', amount: -100.00, type: 'transfer' },
    { id: 't10', date: '2023-10-17', description: 'Bolletta luce', amount: -90.00, type: 'withdrawal' },
  ],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload); // Add new transaction to the beginning
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;