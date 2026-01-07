import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedIcon,
  ThemedInput,
  ThemedInputField,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from "@/components/themed";
import { sklads } from "@/constants/sklad";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import type { IPos } from "@/modules/poses/api/types";
import { Image } from "expo-image";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import type { CreatePosFormData } from "./schema";

interface CreatePosFormViewProps {
  form: UseFormReturn<CreatePosFormData>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  onQuantChange: (value: string) => void;
  onBoxesChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  existingPos?: IPos;
  onSubmit: (data: CreatePosFormData) => void;
  onCancel?: () => void;
  hideActions?: boolean;
}

export function CreatePosFormView({
  form,
  artikul,
  onArtikulChange,
  onQuantChange,
  onBoxesChange,
  isSubmitting,
  isArtLoading,
  artData,
  existingPos,
  onSubmit,
  onCancel,
  hideActions = false,
}: CreatePosFormViewProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;

  const iconColor = useIconColor();
  const { placeholder } = useThemeColors();
  const watchedValues = watch();

  // Проверка валидности формы для активации кнопки
  const artikulValid =
    artikul.trim().length === 9 && /^\d{4}-\d{4}$/.test(artikul.trim());
  const quantValid =
    typeof watchedValues.quant === "number" && watchedValues.quant > 0;
  const boxesValid =
    typeof watchedValues.boxes === "number" && watchedValues.boxes > 0;
  const skladValid = watchedValues.sklad && watchedValues.sklad.length > 0;

  const isFormValid = artikulValid && quantValid && boxesValid && skladValid;

  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "CreatePosFormView.tsx:77",
      message: "Form validation check",
      data: {
        isFormValid,
        artikulValid,
        quantValid,
        boxesValid,
        skladValid,
        artikul,
        artikulLength: artikul.trim().length,
        quant: watchedValues.quant,
        boxes: watchedValues.boxes,
        sklad: watchedValues.sklad,
        errors: Object.keys(errors),
        formIsValid: isValid,
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "C",
    }),
  }).catch(() => {});
  // #endregion

  // Информация об артикуле
  const renderArtInfo = () => {
    if (!artData) return null;

    const imageUrl = getSmallImageUrl(artikul);

    return (
      <ThemedBox className="rounded-lg border border-outline-100 bg-background-50 p-3">
        <ThemedHStack className="items-center gap-3">
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
        </ThemedHStack>
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
              <ThemedInput
                className={`rounded-lg border bg-background-0 ${
                  errors.artikul ? "border-error-500" : "border-outline-100"
                }`}
              >
                <ThemedInputField
                  placeholder="1111-1111"
                  placeholderTextColor={placeholder}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  maxLength={9}
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </ThemedInput>
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

      {/* Поле количества товара */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Кількість товару *
        </ThemedText>
        <Controller
          control={control}
          name="quant"
          render={({ field: { onChange, onBlur, value } }) => {
            const handleChange = (text: string) => {
              // #region agent log
              fetch(
                "http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    location: "CreatePosFormView.tsx:169",
                    message: "quant handleChange called",
                    data: { text, currentValue: value },
                    timestamp: Date.now(),
                    sessionId: "debug-session",
                    runId: "run1",
                    hypothesisId: "B",
                  }),
                }
              ).catch(() => {});
              // #endregion
              const numericValue = text.replace(/\D/g, "");

              let processedValue: string;
              if (numericValue === "") {
                processedValue = "";
              } else if (numericValue === "0") {
                processedValue = "0";
              } else {
                processedValue = numericValue.replace(/^0+/, "");
              }

              const numValue =
                processedValue === "" ? 0 : parseInt(processedValue, 10);
              // #region agent log
              fetch(
                "http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    location: "CreatePosFormView.tsx:181",
                    message: "quant before onChange",
                    data: { numValue, processedValue },
                    timestamp: Date.now(),
                    sessionId: "debug-session",
                    runId: "run1",
                    hypothesisId: "B",
                  }),
                }
              ).catch(() => {});
              // #endregion
              onChange(numValue);
              onQuantChange(processedValue);
            };

            return (
              <ThemedInput
                className={`rounded-lg border bg-background-0 ${
                  errors.quant ? "border-error-500" : "border-outline-100"
                }`}
              >
                <ThemedInputField
                  placeholder="Введіть кількість"
                  placeholderTextColor={placeholder}
                  value={value === 0 ? "" : value.toString()}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </ThemedInput>
            );
          }}
        />
        {errors.quant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.quant.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле количества коробок */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Кількість коробок *
        </ThemedText>
        <Controller
          control={control}
          name="boxes"
          render={({ field: { onChange, onBlur, value } }) => {
            const handleChange = (text: string) => {
              const numericValue = text.replace(/\D/g, "");

              let processedValue: string;
              if (numericValue === "") {
                processedValue = "";
              } else if (numericValue === "0") {
                processedValue = "0";
              } else {
                processedValue = numericValue.replace(/^0+/, "");
              }

              const numValue =
                processedValue === "" ? 0 : parseInt(processedValue, 10);
              onChange(numValue);
              onBoxesChange(processedValue);
            };

            return (
              <ThemedInput
                className={`rounded-lg border bg-background-0 ${
                  errors.boxes ? "border-error-500" : "border-outline-100"
                }`}
              >
                <ThemedInputField
                  placeholder="Введіть кількість коробок"
                  placeholderTextColor={placeholder}
                  value={value === 0 ? "" : value.toString()}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </ThemedInput>
            );
          }}
        />
        {errors.boxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.boxes.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле склада */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Склад *
        </ThemedText>
        <Controller
          control={control}
          name="sklad"
          render={({ field: { onChange, value } }) => (
            <ThemedBox className="gap-2">
              {Object.entries(sklads).map(([key, label]) => {
                const isSelected = value === key;
                return (
                  <ThemedPressable
                    key={key}
                    onPress={() => !isSubmitting && onChange(key)}
                    className={`flex-row items-center justify-between p-3 rounded-lg border ${
                      isSelected
                        ? "border-info-500 bg-info-50/25"
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
                  </ThemedPressable>
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

      {/* Уведомление о существующей позиции */}
      {existingPos && (
        <ThemedView className="rounded-lg p-3 border border-info-500 bg-info-50">
          <ThemedText type="default" className="text-xs text-info-700">
            Такий артикул вже є на палеті. При повній відповідності кількість
            буде об&apos;єднана
          </ThemedText>
        </ThemedView>
      )}

      {/* Ошибки формы */}
      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      {/* Кнопки */}
      {!hideActions && (
        <ThemedHStack className="gap-2">
          {onCancel && (
            <ThemedButton
              onPress={onCancel}
              disabled={isSubmitting}
              variant="outline"
              className="flex-1"
            >
              <ThemedText className="font-semibold">Скасувати</ThemedText>
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
              <ThemedText className="text-white font-semibold">Створити</ThemedText>
            )}
          </ThemedButton>
        </ThemedHStack>
      )}
    </ThemedBox>
  );
}
