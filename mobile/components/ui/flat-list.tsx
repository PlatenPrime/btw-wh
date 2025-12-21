import { FlatList as RNFlatList, FlatListProps } from 'react-native';

// Gluestack doesn't have a dedicated FlatList component,
// so we export the native one directly but typed consistently
export const FlatList = RNFlatList;

export type FlatListProps<T> = FlatListProps<T>;

