import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

import * as Boxo from 'expo-boxo-sdk';
import { MiniappData } from 'expo-boxo-sdk';

const clientId = '';
const authCode = '';
const appId = '';

export default function App() {
  const [appIdText, onChangeAppIdText] = React.useState(appId);

  const [miniapps, setMiniapps] = React.useState<Array<MiniappData>>([]);

  Boxo.setConfig({ clientId: clientId, multitaskMode: true });
  Boxo.addAuthListener((authEvent) => {
    Boxo.setAuthCode(authEvent.appId, authCode)
  });
  Boxo.addPaymentEventListener((paymentData) => {
    Boxo.hideMiniapps();
    paymentData.status = "success";
    Boxo.sendPaymentEvent(paymentData);
    Boxo.openMiniapp({ appId: paymentData.appId })
  });
  Boxo.addCustomEventListener((customEvent) => {
    console.log(customEvent);
    Boxo.sendCustomEvent(customEvent);
  });
  Boxo.addMiniappLifecycleListener((lifecycleData) => {
    console.log(lifecycleData);
  });
  Boxo.addMiniappListListener((result) => {
    setMiniapps(result.miniapps)
  });
  Boxo.getMiniapps();
  return (
    <View style={styles.container}>
      <Text style={styles.miniappTitle}>Miniapp Id</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAppIdText}
        value={appIdText}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() =>
          Boxo.openMiniapp({ appId: appIdText })
        }>
          <Text style={styles.buttonLabel}>Open Miniapp</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {miniapps.length > 0 &&
          miniapps.map((app, index) => (
            <View key={index}>
              <Pressable style={styles.miniappContainer} onPress={() => { Boxo.openMiniapp({ appId: app.appId }) }}>
                {app.logo && (
                  <Image source={{ uri: app.logo }} style={styles.logo} />
                )}
                <Text style={styles.miniappTitle}>{app.name}</Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    width: 200,
    height: 52,
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
    width: '100%'
  },
  miniappContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  miniappTitle: {
    color: '#000000',
    marginStart: 16,
  },
  miniappsTitle: {
    color: 'black',
    textAlign: 'left',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    fontSize: 24
  },
  logo: {
    width: 50,
    height: 50,
  },
});
