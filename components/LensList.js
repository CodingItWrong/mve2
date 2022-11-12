import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const Item = ({ name }) => {
  return (
    <View>
      <Text accessibilityRole={'text'}>
        {name}
      </Text>
    </View>
  );
};

const renderItem = ({ item }) => {
  const name = item.name.brand + ' ' + item.name.platform + ' ' + item.name.model;
  return <Item name={name} />;
};

const Empty = () => {
  return <Text>No IOLs Found</Text>;
};

const LensList = ({ lens, loading, error }) => {

  return (
    <View>
      {error ? (
        <Text accessibilityRole="alert" testID="error">
          Error
        </Text>
      ) : null}
      {loading && !error ? (
        <ActivityIndicator accessibilityRole="progressbar"  />
      ) : (
        <FlatList data={lens} renderItem={renderItem} keyExtractor={(item, index) => index} keyboardShouldPersistTaps="never" ListEmptyComponent={Empty} />
      )}
    </View>
  );
};

export default LensList;