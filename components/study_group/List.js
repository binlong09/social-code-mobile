import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Item from './Item';

class List extends React.Component {
  renderItem = ({ item }) => <Item {...item} {...this.props }/>;
  keyExtractor = item => item.id.toString();

  render() {
    const { ...props } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default List;
