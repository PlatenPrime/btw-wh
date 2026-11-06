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
import { NumericDraftField } from "@/components/shared/numeric-draft-field";
import { sklads } from "@/constants/sklad";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import { SharikImage } from "@/components/shared/sharik-image";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { CreateAskFormData } from "@/modules/asks/components/forms/create-ask-form/schema";
import { useTheme } from "@/providers/theme-provider";
import {
  filterArtikulInput,
  formatArtikulInput,
} from "@/utils/artikul-input";
import {
  filterDigitsInput,
  normalizeDigitsInput,
} from "@/utils/quant-input";
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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  // Информация об артикуле
  const renderArtInfo = () => {
    if (!artData) return null;

    return (
      <ThemedBox className="rounded-lg border border-outline-50 bg-background-50 p-3">
        <ThemedHStack className="items-center gap-3">
          <SharikImage
            artikul={artikul}
            size="prev"
            style={{ width: 60, height: 60, borderRadius: 8 }}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericDraftField
              value={value || ""}
              onChange={(next) => {
                onChange(next);
                onArtikulChange(next);
              }}
              onBlur={onBlur}
              filter={filterArtikulInput}
              normalize={formatArtikulInput}
              placeholder="1111-1111"
              placeholderTextColor={placeholder}
              maxLength={9}
              autoFocus
              editable={!isSubmitting}
              error={!!errors.artikul}
            />
          )}
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
            <NumericDraftField
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              filter={filterDigitsInput}
              normalize={normalizeDigitsInput}
              placeholder="Введіть кількість"
              placeholderTextColor={placeholder}
              editable={!isSubmitting}
              error={!!errors.quant}
            />
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
            <ThemedInput
              className={`rounded-lg border ${
                errors.com ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть коментар"
                placeholderTextColor={placeholder}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="default"
                multiline
                numberOfLines={3}
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
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
                  <ThemedPressable
                    key={key}
                    onPress={() =>
                      !isSubmitting && onChange(key as "pogrebi" | "merezhi")
                    }
                    className={`flex-row items-center justify-between p-3 rounded-lg border ${
                      isSelected
                        ? "border-info-500 bg-info-50"
                        : "border-outline-50 bg-background-0"
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

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

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
            <ThemedText className="text-white font-semibold">
              Створити
            </ThemedText>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedBox>
  );
}
