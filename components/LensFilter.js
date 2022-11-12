import { View, Text,TouchableOpacity,FlatList } from 'react-native';
import { useState } from 'react';

const LensFilter = ({ brands, setSelected}) => {
  const [selected,setSelectedLens] = useState('All')
  const [visible,setVisible] = useState(false);

  const handlePress = (item) => {
    setSelectedLens(item);
    setSelected(item);
    setVisible(false);
  }
  
  const renderItem = ({item}) => {
    return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Text accessibilityRole="text">{item}</Text>
    </TouchableOpacity>)
  }
  return ( 
    <View>
      <TouchableOpacity accessibilityRole="menu" accessibilityState={"selected"} onPress={() => setVisible((visible) => !visible)}>
      <Text accessibilityRole="text">{selected || "All"}</Text>
      </TouchableOpacity>
      {visible ? <FlatList accessibilityRole="menu2" data={brands} renderItem={renderItem}/> : null}
    </View>
  );
};

export default LensFilter;