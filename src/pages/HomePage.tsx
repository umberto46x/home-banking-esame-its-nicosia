import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Wallet } from 'lucide-react';

const HomePage = () => {
  const { balance, cards } = useSelector((state: RootState) => state.account);
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const recentTransactions = transactions.slice(0, 5); // Get last 5 transactions

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Riepilogo Conto</h1>

      {/* Balance Summary */}
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Disponibile</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs text-muted-foreground mt-1">Aggiornato in tempo reale</p>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ultimi Movimenti</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center">Nessun movimento recente.</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-muted-foreground text-xs">{new Date(transaction.date).toLocaleDateString('it-IT')}</p>
                  </div>
                  <p className={`font-semibold ${transaction.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Associated Cards */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Le Tue Carte</CardTitle>
        </CardHeader>
        <CardContent>
          {cards.length === 0 ? (
            <p className="text-muted-foreground text-center">Nessuna carta associata.</p>
          ) : (
            <div className="space-y-3">
              {cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{card.type} **** {card.lastFourDigits}</p>
                  </div>
                  <p className="text-muted-foreground">Scad. {card.expiryDate}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;