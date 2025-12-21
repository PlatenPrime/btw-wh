import { ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';

// Gluestack doesn't have a dedicated ScrollView component,
// so we export the native one directly but typed consistently
export const ScrollView = RNScrollView;

export type ScrollViewProps = RNScrollViewProps;

