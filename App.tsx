/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Home';

const styles = StyleSheet.create({
  container: { height: '100%', backgroundColor: '#fff' },
});

const App = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Home />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
