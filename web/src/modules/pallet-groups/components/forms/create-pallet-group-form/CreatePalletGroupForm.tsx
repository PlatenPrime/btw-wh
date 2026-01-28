import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useCreatePalletGroupMutation";
import type { CreatePalletGroupFormValues } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/schema";
import { createPalletGroupSchema } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreatePalletGroupFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreatePalletGroupForm({
  onSuccess,
  onCancel,
}: CreatePalletGroupFormProps) {
  const form = useForm<CreatePalletGroupFormValues>({
    resolver: zodResolver(createPalletGroupSchema),
    defaultValues: {
      title: "",
      order: 1,
    },
  });

  const createMutation = useCreatePalletGroupMutation();

  const handleSubmit = async (values: CreatePalletGroupFormValues) => {
    await createMutation.mutateAsync({
      title: values.title,
      order: values.order,
    });
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
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

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={createMutation.isPending}
          >
            Скасувати
          </Button>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Створення..." : "Створити"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
