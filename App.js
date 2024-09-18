import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import ComponentTray from "./components/Tray";
import DropZone from "./components/DropZone";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]); // Store dropped items and their positions
  const [lines, setLines] = useState([50, 150, 250, 350, 450]); // Define y-coordinates for the lines
  const linesRef = useRef(lines);
  const dropZoneLayoutRef = useRef(null); // Use ref for DropZone layout

  const handleAddLine = () => {
    const newLine = lines.length > 0 ? lines[lines.length - 1] + 100:20
    console.log(`Adding new line at Y: ${newLine}`);
    setLines((prevLines) => [...prevLines, newLine]);
    console.log("Added new line at Y:", newLine);
  };

  const handleDeleteLine = () => {
    if (lines.length > 0) {
      console.log(`Deleting last line at Y: ${lines[lines.length - 1]}`);
      setLines((prevLines) => prevLines.slice(0, -1));
    }
  };
  useEffect(() => {
    linesRef.current = lines; 
}, [lines]);
 
  const handleDrop = (item, position) => {
    const dropZoneLayout = dropZoneLayoutRef.current;
    if (!dropZoneLayout) {
      console.warn("Drop zone layout not yet calculated.");
      return false;
    }

    const adjustedX = position.x - dropZoneLayout.x || 0;
    const adjustedY = Math.round(position.y - dropZoneLayout.y || 0);
    console.log("Dropped Position:", position);
    console.log("DropZone Layout y coord:", dropZoneLayout.y);

    console.log("Adjusted X:", adjustedX);
    console.log("Adjusted Y:", adjustedY);
    console.log("Lines from handleDrop function:", linesRef.current.join(", "));

    const closestLine = lines.find((lineY) =>Math.abs(lineY - adjustedY) < 50);
    console.log("Closest Line:", closestLine);
    linesRef.current.forEach(lineY => {
      const distance = Math.abs(lineY - adjustedY);
      console.log(`Checking line at ${lineY}: Distance = ${distance}`);
      if (distance < 50) {
          console.log(`Snapping to line at Y: ${lineY}`);
          setDroppedItems(prevItems => [
              ...prevItems,
              { item, position: { x: adjustedX, y: lineY } },
          ]);
          return true;
      }
  });
  

    if (closestLine !== undefined) {
      console.log(`Snapping to line at Y: ${closestLine}`);

      setDroppedItems((prevItems) => [
        ...prevItems,
        { item, position: { x: adjustedX, y: closestLine } },  
      ]);
      return true;  
    } else {
      console.warn('Component not dropped near any line, returning to tray.');
      return false;  
    }
  };


  return (
   
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Add New Line" onPress={handleAddLine} />
          <Button title="Delete Line" onPress={handleDeleteLine} />
        </View>
        <View
          style={styles.dropZoneWrapper}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            dropZoneLayoutRef.current = { x, y, width, height }; 
            console.log("DropZone layout:", { x, y, width, height });
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default App;
