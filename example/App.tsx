import { StyleSheet, Text, View, Pressable } from 'react-native';

import * as Boxo from 'expo-boxo-sdk';

export default function App() {
    Boxo.setConfig({clientId:'602248', multitaskMode: true});
    Boxo.addAuthListener((authEvent)=>{
        Boxo.setAuthCode(authEvent.appId, 'tNCYV57xV03Ds3ar63oQtddQxUxCRY')
    });
  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
                 <Pressable style={styles.button} onPress={() =>
                  Boxo.openMiniapp({appId:'app16973'})
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
