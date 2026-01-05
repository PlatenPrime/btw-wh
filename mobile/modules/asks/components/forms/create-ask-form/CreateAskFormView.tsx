import {
  ThemedBox,
  ThemedButton,
  ThemedIcon,
  ThemedText,
  ThemedView,
} from "@/components/themed";
import { HStack, Input, InputField, Pressable, Text } from "@/components/ui";
import { sklads } from "@/constants/sklad";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import type { CreateAskFormData } from "@/modules/asks/components/forms/create-ask-form/schema";
import { Image } from "expo-image";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";

interface CreateAskFormViewProps {
  form: UseFormReturn<CreateAskFormData>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  onSubmit: (data: CreateAskFormData) => void;
  onCancel?: () => void;
}

export function CreateAskFormView({
  form,
  artikul,
  onArtikulChange,
  isSubmitting,
  isArtLoading,
  artData,
  onSubmit,
  onCancel,
}: CreateAskFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const iconColor = useIconColor();
  const { placeholder } = useThemeColors();

  // Информация об артикуле
  const renderArtInfo = () => {
    if (!artData) return null;

    const imageUrl = getSmallImageUrl(artikul);

    return (
      <ThemedBox className="rounded-lg border border-outline-100 bg-background-50 p-3">
        <HStack className="items-center gap-3">
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 60, height: 60, borderRadius: 8 }}
            contentFit="cover"
            placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
            transition={200}
          />
          <ThemedBox className="flex-1">
            <ThemedText type="defaultSemiBold" className="text-sm">
              {artData.nameukr}
            </ThemedText>
            <ThemedText type="default" className="text-xs opacity-70">
              {artikul}
            </ThemedText>
          </ThemedBox>
        </HStack>
      </ThemedBox>
    );
  };

  return (
    <ThemedBox className="gap-4">
      {/* Информация об артикуле */}
      {renderArtInfo()}

      {/* Поле артикула */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Артикул *
        </ThemedText>
        <Controller
          control={control}
          name="artikul"
          render={({ field: { onChange, onBlur, value } }) => {
            const handleChange = (text: string) => {
              // Автоматическое добавление дефиса после 4 символов
              let formattedText = text.replace(/\D/g, "");
              if (formattedText.length > 4) {
                formattedText = `${formattedText.slice(
                  0,
                  4
                )}-${formattedText.slice(4, 8)}`;
              }
              onChange(formattedText);
              onArtikulChange(formattedText);
            };

            return (
              <Input
                className={`rounded-lg border bg-background-0 ${
                  errors.artikul ? "border-error-500" : "border-outline-100"
                }`}
              >
                <InputField
                  placeholder="1111-1111"
                  placeholderTextColor={placeholder}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  maxLength={9}
                  autoFocus
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </Input>
            );
          }}
        />
        {errors.artikul && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.artikul.message}
          </ThemedText>
        )}
        {isArtLoading && (
          <ThemedText type="default" className="text-xs opacity-70">
            Пошук артикула...
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле количества */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Кількість
        </ThemedText>
        <Controller
          control={control}
          name="quant"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.quant ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть кількість"
                placeholderTextColor={SemanticColors.placeholder.light}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.quant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.quant.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле комментария */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Коментар
        </ThemedText>
        <Controller
          control={control}
          name="com"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.com ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть коментар"
                placeholderTextColor={SemanticColors.placeholder.light}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="default"
                multiline
                numberOfLines={3}
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.com && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.com.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле склада */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Склад
        </ThemedText>
        <Controller
          control={control}
          name="sklad"
          render={({ field: { onChange, value } }) => (
            <ThemedBox className="gap-2">
              {Object.entries(sklads).map(([key, label]) => {
                const isSelected = value === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() =>
                      !isSubmitting && onChange(key as "pogrebi" | "merezhi")
                    }
                    className={`flex-row items-center justify-between p-3 rounded-lg border ${
                      isSelected
                        ? "border-info-500 bg-info-50"
                        : "border-outline-100 bg-background-0"
                    }`}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  >
                    <ThemedText
                      type="default"
                      className={
                        isSelected ? "text-info-700" : "text-typography-900"
                      }
                    >
                      {label}
                    </ThemedText>
                    <ThemedIcon
                      family="MaterialIcons"
                      name={
                        isSelected
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={20}
                      color={isSelected ? SemanticColors.info : iconColor}
                    />
                  </Pressable>
                );
              })}
            </ThemedBox>
          )}
        />
        {errors.sklad && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sklad.message}
          </ThemedText>
        )}
      </ThemedBox>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <HStack className="gap-2">
        {onCancel && (
          <ThemedButton
            onPress={onCancel}
            disabled={isSubmitting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </ThemedButton>
        )}
        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="create"
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <Text className="text-white font-semibold">Створити</Text>
          )}
        </ThemedButton>
      </HStack>
    </ThemedBox>
  );
}
