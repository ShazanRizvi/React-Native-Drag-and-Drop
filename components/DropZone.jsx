import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DropZone = ({ droppedItems, lines }) => {
  return (
    <View style={styles.dropZone}>
      {/* Draw the lines */}
      {lines.map((lineY, index) => (
        <View key={index} style={[styles.line, { top: lineY }]} />
      ))}

      {/* Render dropped items on the closest line */}
      {droppedItems.map((droppedItem, index) => (
        <View
          key={index}
          style={[
            styles.droppedItem,
            {
              left: droppedItem.position.x - 50,  // Adjust the x-coordinate
              top: droppedItem.position.y,        // Snap to the closest line's y-coordinate
            },
          ]}
        >
          <Text>{droppedItem.item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'grey', // Line color
  },
  droppedItem: {
    position: 'absolute',
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DropZone;
