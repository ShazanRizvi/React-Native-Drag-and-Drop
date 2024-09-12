import React from 'react';
import { View, Text } from 'react-native';
import { DraxView } from 'react-native-drax';

const DraggableBox = ({ label, isDropped }) => {
  return (
    !isDropped && (
      <DraxView
        style={styles.draggableBox}
        payload={label}
        draggable={true}
        longPressDelay={150}
      >
        <Text>{label}</Text>
      </DraxView>
    )
  );
};

const styles = {
  draggableBox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DraggableBox;
