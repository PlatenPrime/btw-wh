import { useRenameBlockMutation } from "@/modules/blocks/api/hooks/mutations/useRenameBlockMutation";
import {
    renameBlockSchema,
    type RenameBlockFormValues,
} from "@/modules/blocks/components/forms/rename-block-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RenameBlockFormView } from "./RenameBlockFormView";

interface RenameBlockFormProps {
    blockId: string;
    currentTitle: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function RenameBlockForm({
    blockId,
    currentTitle,
    onSuccess,
    onCancel,
}: RenameBlockFormProps) {
    const form = useForm<RenameBlockFormValues>({
        resolver: zodResolver(renameBlockSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            title: currentTitle,
        },
    });

    const mutation = useRenameBlockMutation();

    const onSubmit = async (data: RenameBlockFormValues) => {
        try {
            await mutation.mutateAsync({ id: blockId, title: data.title });
            onSuccess?.();
            form.reset({ title: data.title });
        } catch (error) {
            console.error("Помилка перейменування блоку:", error);
            form.setError("root", {
                message:
                    error instanceof Error ? error.message : "Помилка перейменування блоку",
            });
        }
    };

    return (
        <RenameBlockFormView
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={mutation.isPending}
        />
    );
}
