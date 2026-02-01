import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreatePalletGroupFormValues } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreatePalletGroupFormViewProps {
  form: UseFormReturn<CreatePalletGroupFormValues>;
  onSubmit: (data: CreatePalletGroupFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CreatePalletGroupFormView({
  form,
  onSubmit,
  onCancel,
  isSubmitting,
}: CreatePalletGroupFormViewProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва групи</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Наприклад, Гарячі палети біля воріт"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Порядок</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value
                        ? Number.parseInt(event.target.value, 10)
                        : "",
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogActions
          onCancel={onCancel}
          onSubmit={form.handleSubmit(onSubmit)}
          cancelText="Скасувати"
          submitText="Створити"
          isSubmitting={isSubmitting}
          variant="success"
        />
      </form>
    </Form>
  );
}
