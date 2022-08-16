import database from '@react-native-firebase/database';
import { Input, Text } from 'native-base';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  button: { padding: 4, borderRadius: 8 },
});

const settingValueRef = database().ref('app/setting');
export default function Setting() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      DiameterWire: '',
      Material: '',
      NumberLayer: '',
      Speed: '',
    },
  });
  const onSubmit = (data: any) => {
    settingValueRef.set({
      DiameterWire: Number(data.DiameterWire),
      Material: Number(data.Material),
      NumberLayer: Number(data.NumberLayer),
      Speed: Number(data.Speed),
    });
  };

  useEffect(() => {
    settingValueRef.on('value', snapshot => {
      const data = snapshot.val();
      reset({
        DiameterWire: String(data.DiameterWire),
        Material: String(data.Material),
        NumberLayer: String(data.NumberLayer),
        Speed: String(data.Speed),
      });
    });
    return () => {
      settingValueRef.off();
    };
  }, [reset]);

  return (
    <View style={styles.container}>
      <Text>DiameterWire</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="DiameterWire"
            value={value}
          />
        )}
        name="DiameterWire"
      />

      <Text>Material</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Material"
            value={value}
          />
        )}
        name="Material"
      />
      <Text>NumberLayer</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="NumberLayer"
            value={value}
          />
        )}
        name="NumberLayer"
      />
      <Text>Speed</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Speed"
            value={value}
            marginBottom={4}
          />
        )}
        name="Speed"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
