import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  button: { width: '50%', padding: 4, borderRadius: 8 },
});

const buttons = ['Reset', 'Init Position', 'Start', 'Stop'];
const controlValueRef = database().ref('controlValue');
const appControlRef = database().ref('app/control');

export default function Control() {
  const [stateCurrent, setStateCurrent] = useState('');
  const [appControl, setAppControl] = useState('');

  const handleCLick = (value: string) => {
    appControlRef.set(value);
  };

  useEffect(() => {
    controlValueRef.on('value', snapshot => {
      const data = snapshot.val();
      setStateCurrent(data);
    });
    appControlRef.on('value', snapshot => {
      const data = snapshot.val();
      setAppControl(data);
    });
    return () => {
      controlValueRef.off();
      appControlRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      {buttons.map(value => (
        <View key={value} style={styles.button}>
          <Button
            color={value === appControl ? '#f00' : undefined}
            title={value}
            onPress={() => handleCLick(value)}
          />
        </View>
      ))}
      <Text
        style={{ marginTop: 16, color: '#000' }}
      >{`Current State: ${stateCurrent}`}</Text>
    </View>
  );
}
