import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ComponentTray from './components/Tray';
import DropZone from './components/DropZone';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);  // Store dropped items and their positions
  const [lines, setLines] = useState([50, 150, 250, 350, 450]);  // Define y-coordinates for the lines
  const dropZoneLayoutRef = useRef(null);  // Use ref for DropZone layout

  // Function to handle dropping the item
  const handleDrop = (item, position) => {
    const dropZoneLayout = dropZoneLayoutRef.current;

    if (!dropZoneLayout) {
      console.warn('Drop zone layout not yet calculated.');
      return false;
    }

    // Adjust position relative to DropZone
    const adjustedX = position.x - dropZoneLayout.x || 0;
    const adjustedY = position.y - dropZoneLayout.y || 0;

    console.log('Adjusted X:', adjustedX);
    console.log('Adjusted Y:', adjustedY);

    // Check if the drop is near any line (within 20px proximity)
    const closestLine = lines.find((lineY) => Math.abs(lineY - adjustedY) < 50);  // Increase the proximity check to 50px

    if (closestLine !== undefined) {
      console.log(`Snapping to line at Y: ${closestLine}`);
      // Snap the component to the closest line
      setDroppedItems((prevItems) => [
        ...prevItems,
        { item, position: { x: adjustedX, y: closestLine } },  // Snap to the closest line
      ]);
      return true;  // Successful drop
    } else {
      console.warn('Component not dropped near any line, returning to tray.');
      return false;  // Unsuccessful drop
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {/* DropZone where components are dropped */}
        <View
          style={styles.dropZoneWrapper}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            dropZoneLayoutRef.current = { x, y, width, height };  // Store DropZone layout in ref
            console.log('DropZone layout:', { x, y, width, height });
          }}
        >
          <DropZone droppedItems={droppedItems} lines={lines} />
        </View>

        {/* Component Tray */}
        <ComponentTray onDrop={handleDrop} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropZoneWrapper: {
    flex: 1,
  },
});

export default App;
