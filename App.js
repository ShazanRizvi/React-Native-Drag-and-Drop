import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DraxProvider } from 'react-native-drax';
import ComponentTray from './components/Tray';
import DropZone from './components/DropZone';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <DraxProvider>
        <View style={styles.container}>
          <DropZone />
          <ComponentTray />
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
  },
});

export default App;
