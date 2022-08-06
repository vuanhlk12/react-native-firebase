import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: { width: '50%', padding: 4, borderRadius: 8 },
});

const buttons = ['Reset', 'Init Position', 'Start', 'Stop'];

export default function App() {
  const handleCLick = (value: string) => {
    console.log('value', value);
  };

  return (
    <View style={styles.container}>
      {buttons.map(value => (
        <View key={value} style={styles.button}>
          <Button title={value} onPress={() => handleCLick(value)} />
        </View>
      ))}
    </View>
  );
}
