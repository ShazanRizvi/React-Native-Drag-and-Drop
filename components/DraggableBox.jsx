import React, { useRef } from 'react';
import { Text, PanResponder, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const DraggableItem = ({ label, onDrop }) => {
  const translateX = useSharedValue(0);  // Track horizontal movement
  const translateY = useSharedValue(0);  // Track vertical movement

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,  // Always allow dragging

      onPanResponderMove: (event, gestureState) => {
        // Move the component as the user drags it
        translateX.value = gestureState.dx;
        translateY.value = gestureState.dy;
      },

      onPanResponderRelease: (event, gestureState) => {
        const finalX = gestureState.moveX;
        const finalY = gestureState.moveY;

        // Check if the drop is successful (within a line)
        const success = onDrop(label, { x: finalX, y: finalY });

        if (success) {
          // Snap the component to the closest line
          translateX.value = withSpring(0);  // Reset X to original position (centered)
          translateY.value = withSpring(0);  // Reset Y based on snapped line position
        } else {
          // If drop is unsuccessful (outside of DropZone), return to previous position
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      },
    })
  ).current;

  // Apply the animated style to move the component based on dragging
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View
      {...panResponder.panHandlers}  // Attach gesture handlers
      style={[styles.draggable, animatedStyle]}  // Apply animated movement
    >
      <Text>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  draggable: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default DraggableItem;
