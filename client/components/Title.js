import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30
  }
})

export const Title = () => {
  return (<View>
    <Text style={styles.text}>Włącz/Wyłącz lampki</Text>
  </View>)
}