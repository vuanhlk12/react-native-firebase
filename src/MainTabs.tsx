import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import Control from './tabs/Control';

const FirstRoute = () => <Control />;

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673a11' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const routes = [
  { key: 'first', title: 'Control' },
  { key: 'second', title: 'Measure' },
  { key: 'third', title: 'Setting' },
];

export default function MainTabs() {
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  scene: {
    flex: 1,
  },
});
