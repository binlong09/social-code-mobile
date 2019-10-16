import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Item from './Item';

export const items = [
  {
    id: 1,
    image_url: "https://images.localist.com/photos/746192/huge/039c008e2501b5024e16245536c29d9028451ca0.jpg",
    professor_name: "Professor Kim",
    location: "Glat 112",
    meeting_time: "Tuesday 8:00PM",
    class_code: "CS 216",
    going: true,
    going_count: 12
  },
  {
    id: 2,
    image_url: "https://images.localist.com/photos/741810/big_square@2x/550cf7fbad91bd4d1d20ba29731cdb5379ff11e2.jpg",
    professor_name: "Professor Jameson",
    location: "Science Center 001",
    meeting_time: "Monday 7:00PM",
    class_code: "Chem 112",
    going: false,
    going_count: 8
  },
  {
    id: 3,
    image_url: "https://images.localist.com/photos/741746/big_square@2x/b8513b1fdde055487274e639463fe5431b4b3569.jpg",
    professor_name: "Professor Xie",
    location: "Breigdenbaugh 222",
    meeting_time: "Sunday 8:00PM",
    class_code: "AS 222",
    going: true,
    going_count: 8
  },
  {
    id: 5,
    image_url: "https://images.localist.com/photos/746192/huge/039c008e2501b5024e16245536c29d9028451ca0.jpg",
    professor_name: "Professor Kim",
    location: "Musselman Library 001",
    meeting_time: "Tuesday 3:00PM",
    class_code: "OMS 322",
    going: false,
    going_count: 6
  }
]
class List extends React.Component {
  renderItem = ({ item }) => <Item {...item}/>;
  keyExtractor = item => item.id.toString();

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) => <Item {...item} {...this.props.navigation}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red'
  }
})

export default List;
