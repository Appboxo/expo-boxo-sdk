import { StyleSheet, Text, View, Pressable } from 'react-native';

import * as Boxo from 'expo-boxo-sdk';

const clientId = '';
const authCode = '';
const appId = '';

export default function App() {
    Boxo.setConfig({clientId: clientId, multitaskMode: true});
    Boxo.addAuthListener((authEvent)=>{
        Boxo.setAuthCode(authEvent.appId, authCode)
    });
    Boxo.addPaymentEventListener((paymentData)=>{
        Boxo.hideMiniapps();
        paymentData.status = "success";
        Boxo.sendPaymentEvent(paymentData);
        Boxo.openMiniapp({appId: paymentData.appId})
    });
    Boxo.addCustomEventListener((customEvent)=>{
        console.log(customEvent);
        Boxo.sendCustomEvent(customEvent);
    });
    Boxo.addMiniappLifecycleListener((lifecycleData)=>{
        console.log(lifecycleData);
    });
    Boxo.addMiniappListListener((result)=>{
        console.log(result.miniapps);
    });
    Boxo.getMiniapps();
  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
                 <Pressable style={styles.button} onPress={() =>
                  Boxo.openMiniapp({appId:appId})
                 }>
                   <Text style={styles.buttonLabel}>Open Miniapp</Text>
                 </Pressable>
               </View>

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
   buttonContainer: {
      width: 320,
      height: 68,
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
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: '#000',
      fontSize: 16,
    },
});
