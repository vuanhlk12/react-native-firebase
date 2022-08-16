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
const appControlRef = database().ref('app/control');

export default function Control() {
  const [appControl, setAppControl] = useState(0);

  const handleCLick = (value: number) => {
    appControlRef.set(value);
  };

  useEffect(() => {
    appControlRef.on('value', snapshot => {
      const data = snapshot.val();
      setAppControl(() => data);
    });
    return () => {
      appControlRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      {buttons.map((value, index) => (
        <View key={value} style={styles.button}>
          <Button
            color={index + 1 === appControl ? '#f00' : undefined}
            title={value}
            onPress={() => handleCLick(index + 1)}
          />
        </View>
      ))}
      <Text style={{ marginTop: 16, color: '#000' }}>{`Current State: ${
        buttons[appControl - 1] ?? ''
      }`}</Text>
    </View>
  );
}
