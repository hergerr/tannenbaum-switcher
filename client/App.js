/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { MainScreen } from './views/MainScreen';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white'
  }
})

const App: () => Node = () => {

  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;
