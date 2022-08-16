import database from '@react-native-firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  button: { padding: 4, borderRadius: 8 },
});

const measures = ['Layer', 'Radius', 'Rotation', 'Speed'];
const measureValueRef = database().ref('measure');

interface Measure {
  Layer: string;
  Radius: string;
  Rotation: string;
  Speed: string;
}

export default function Measure() {
  const [stateCurrent, setStateCurrent] = useState<any>({
    Layer: '',
    Radius: '',
    Rotation: '',
    Speed: '',
  });

  useEffect(() => {
    measureValueRef.on('value', snapshot => {
      const data = snapshot.val();
      setStateCurrent(() => data);
    });
    return () => {
      measureValueRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      {measures.map(value => (
        <View key={value} style={styles.button}>
          <Text
            style={{ color: '#000' }}
          >{`${value}: ${stateCurrent?.[value]}`}</Text>
        </View>
      ))}
    </View>
  );
}
