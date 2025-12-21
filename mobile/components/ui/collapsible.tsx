import { PropsWithChildren, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Pressable, HStack } from '@/components/ui';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView>
      <Pressable
        className="items-center gap-1.5"
        onPress={() => setIsOpen((value) => !value)}
      >
        <HStack className="items-center gap-1.5">
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color="#374151"
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </HStack>
      </Pressable>
      {isOpen && <ThemedView className="mt-1.5 ml-6">{children}</ThemedView>}
    </ThemedView>
  );
}
