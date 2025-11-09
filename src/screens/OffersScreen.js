import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Typography from '../utils/typography';

export default function BookingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headingMedium ,...styles.header}}>Offers</Text>

      <View style={styles.emptyState}>
      
        <Text style={styles.title}>No Offers Yet</Text>
        <Text style={[Typography.caption, styles.caption]}>
          You don’t have any Offers at the moment.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  illustration: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  caption: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
