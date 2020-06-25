import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDAO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number => {
      return accumulator + currentValue;
    };

    const incomes = this.transactions.filter(t => t.type === 'income');
    const outcomes = this.transactions.filter(t => t.type === 'outcome');

    let sumIncomes = 0;
    let sumOutcomes = 0;

    if (incomes.length > 0) {
      sumIncomes = incomes.map(t => t.value).reduce(reducer);
    }

    if (outcomes.length > 0) {
      sumOutcomes = outcomes.map(t => t.value).reduce(reducer);
    }

    const total = sumIncomes - sumOutcomes;

    return { income: sumIncomes, outcome: sumOutcomes, total };
  }

  public create({ title, value, type }: CreateTransactionDAO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
