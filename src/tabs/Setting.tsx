import database from '@react-native-firebase/database';
import { Input } from 'native-base';
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

const settingValueRef = database().ref('settingValue');
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
    settingValueRef.set(data);
  };

  useEffect(() => {
    settingValueRef.on('value', snapshot => {
      const data = snapshot.val();
      reset(data);
    });
    return () => {
      settingValueRef.off();
    };
  }, [reset]);

  return (
    <View style={styles.container}>
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
            marginTop={4}
          />
        )}
        name="DiameterWire"
      />

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
            marginTop={4}
          />
        )}
        name="Material"
      />
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
            marginTop={4}
          />
        )}
        name="NumberLayer"
      />
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
            marginTop={4}
            marginBottom={4}
          />
        )}
        name="Speed"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
