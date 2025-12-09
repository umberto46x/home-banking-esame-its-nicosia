import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateBalance } from '@/store/accountSlice';
import { addTransaction } from '@/store/transactionSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  iban: z.string().min(1, { message: 'IBAN è obbligatorio.' }).regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, { message: 'IBAN non valido.' }),
  beneficiary: z.string().min(1, { message: 'Nome beneficiario è obbligatorio.' }),
  amount: z.coerce.number().min(0.01, { message: 'L\'importo deve essere maggiore di zero.' }),
  casual: z.string().optional(),
});

const TransferPage = () => {
  const dispatch = useDispatch();
  const currentBalance = useSelector((state: RootState) => state.account.balance);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iban: '',
      beneficiary: '',
      amount: 0,
      casual: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentBalance < values.amount) {
      toast.error('Saldo insufficiente', {
        description: 'Non hai abbastanza fondi per effettuare questo bonifico.',
      });
      return;
    }

    // Simulate transfer
    const newTransaction = {
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Bonifico a ${values.beneficiary}`,
      amount: -values.amount, // Negative for outgoing transfer
      type: 'transfer' as const,
    };

    dispatch(updateBalance(-values.amount));
    dispatch(addTransaction(newTransaction));

    toast.success('Bonifico effettuato con successo!', {
      description: `Hai inviato ${values.amount.toFixed(2)}€ a ${values.beneficiary}.`,
    });

    form.reset();
  };

  return (
    <div className="flex justify-center items-center p-4 md:p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Simulazione Bonifico</CardTitle>
          <CardDescription className="text-center">
            Compila il modulo per effettuare un bonifico simulato.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="iban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN Destinatario</FormLabel>
                    <FormControl>
                      <Input placeholder="IT60X0542811101000000123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beneficiary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Beneficiario</FormLabel>
                    <FormControl>
                      <Input placeholder="Mario Rossi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importo (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="100.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="casual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Causale (Opzionale)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Pagamento fattura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Conferma Bonifico</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferPage;