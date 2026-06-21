import { STORAGE_KEYS } from "../constants";
import { Expense } from "../types/expense";
import { getItem, setItem } from "./storage";

export async function getExpenses(): Promise<Expense[]> {
  const expenses = await getItem<Expense[]>(
    STORAGE_KEYS.EXPENSES
  );

  return expenses ?? [];
}

export async function saveExpenses(
  expenses: Expense[]
): Promise<void> {
  await setItem(STORAGE_KEYS.EXPENSES, expenses);
}

export async function addExpense(
  expense: Expense
): Promise<void> {
  const expenses = await getExpenses();

  expenses.push(expense);

  await saveExpenses(expenses);
}

export async function updateExpense(
  expense: Expense
): Promise<void> {
  const expenses = await getExpenses();

  await saveExpenses(
    expenses.map((item) =>
      item.id === expense.id ? expense : item
    )
  );
}

export async function deleteExpense(
  id: string
): Promise<void> {
  const expenses = await getExpenses();

  await saveExpenses(
    expenses.filter((item) => item.id !== id)
  );
}