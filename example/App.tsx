import { StyleSheet, Text, View } from 'react-native';

import * as ExpoBoxoSdk from 'expo-boxo-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoBoxoSdk.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
