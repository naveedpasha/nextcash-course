"use client";

import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form";
import { type Category } from "@/types/Category";
import { createTransaction } from "./actions";
import { format } from "date-fns";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewTransactionForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyy-MM-dd"),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast.error("Error", {
        description: result.message,
        duration: 2000,
      });
      return;
    }

    toast.success("Succeess", {
      description: "Transaction created",
      duration: 2000,
    });

    router.push(
      `/dashaboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&${data.transactionDate.getFullYear()}`
    );

    console.log(result.id);
  };
  return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
}
