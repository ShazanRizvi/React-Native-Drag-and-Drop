import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { DraxView } from 'react-native-drax';

const DropZone = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const handleDrop = (event) => {
    const newPayload = event.dragged.payload;
    // Add the newly dropped item to the state
    setDroppedItems((prevItems) => [...prevItems, newPayload]);
    console.log('Dropped:', newPayload);
  };

  return (
    <DraxView
      style={styles.dropZone}
      onReceiveDragDrop={handleDrop}
    >
      {droppedItems.length === 0 ? (
        <Text>Drop Items Here</Text>
      ) : (
        droppedItems.map((item, index) => (
          <View key={index} style={styles.droppedItem}>
            <Text>{item}</Text>
          </View>
        ))
      )}
    </DraxView>
  );
};

const styles = {
  dropZone: {
    width: 300,
    height: 700,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  droppedItem: {
    width: 100,
    height: 50,
    backgroundColor: 'lightgray',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DropZone;
