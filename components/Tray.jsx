import React from 'react';
import { View, StyleSheet } from 'react-native';
import DraggableItem from './DraggableBox'; // Reusing the DraggableItem component from earlier

const ComponentTray = ({ onDrop }) => {
  const components = ['Component1', 'Component2', 'Component3'];

  return (
    <View style={styles.tray}>
      {components.map((component, index) => (
        <DraggableItem
          key={index}
          label={component}
          onDrop={onDrop} // Pass the drop handler to each draggable component
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tray: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default ComponentTray;
