import React from 'react';
import { View, Text } from 'react-native';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';

const ComponentTray = () => {
  const components = ['Component1', 'Component2', 'Component3'];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {components.map((component, index) => (
        <DraxView
          key={index}
          style={styles.draggable}
          payload={component}
          draggable={true}
          longPressDelay={150} // for a smoother drag experience
        >
          <Text>{component}</Text>
        </DraxView>
      ))}
    </View>
  );
};

const styles = {
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ComponentTray;
