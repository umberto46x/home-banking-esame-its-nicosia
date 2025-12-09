import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, Transaction } from '@/store/transactionSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const MovementsPage = () => {
  const allTransactions = useSelector((state: RootState) => state.transactions.transactions);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAmount, setFilterAmount] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesAmount = filterAmount === '' || Math.abs(transaction.amount) >= parseFloat(filterAmount);
    const matchesDate = filterDate === '' || transaction.date.startsWith(filterDate);
    return matchesType && matchesAmount && matchesDate;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Tutti i Movimenti</h1>

      {/* Filters */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filtra Movimenti</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="filterType">Tipologia</Label>
            <Select onValueChange={setFilterType} value={filterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti</SelectItem>
                <SelectItem value="deposit">Deposito</SelectItem>
                <SelectItem value="withdrawal">Prelievo</SelectItem>
                <SelectItem value="transfer">Bonifico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filterAmount">Importo Minimo</Label>
            <Input
              id="filterAmount"
              type="number"
              placeholder="Es. 50"
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="filterDate">Data (YYYY-MM-DD)</Label>
            <Input
              id="filterDate"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Elenco Completo</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center">Nessun movimento trovato con i filtri selezionati.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrizione</TableHead>
                    <TableHead>Tipologia</TableHead>
                    <TableHead className="text-right">Importo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('it-IT')}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="capitalize">{transaction.type}</TableCell>
                      <TableCell className={`text-right font-semibold ${transaction.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementsPage;