import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';

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
const controlValueRef = database().ref('controlValue');

export default function Control() {
  const [stateCurrent, setStateCurrent] = useState('');
  const handleCLick = (value: string) => {
    controlValueRef.set(value);
  };

  useEffect(() => {
    controlValueRef.on('value', snapshot => {
      const data = snapshot.val();
      setStateCurrent(data);
    });
    return () => {
      controlValueRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      {buttons.map(value => (
        <View key={value} style={styles.button}>
          <Button title={value} onPress={() => handleCLick(value)} />
        </View>
      ))}
      <Text style={{ marginTop: 16 }}>{`State Current: ${stateCurrent}`}</Text>
    </View>
  );
}
