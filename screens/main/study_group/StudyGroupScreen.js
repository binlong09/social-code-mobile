import React, { Component } from 'react'
import {
  StyleSheet, Text, View, SafeAreaView, AsyncStorage,
  LayoutAnimation, ActivityIndicator, RefreshControl
} from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { logout } from '../../../actions/auth_actions'
import { connect } from 'react-redux';
import List from '../../../components/study_group/List';
import NavigationService from '../../../services/NavigationService'
import { withNavigationFocus } from 'react-navigation'
import {
  getStudyGroupsIndex,
  searchStudyGroup
} from '../../../actions/study_group/study_group_index_actions'
import { axiosInstance } from '../../../services/client';

class StudyGroupScreen extends Component {
  static navigationOptions = {
    headerRight: (
      <Button
        onPress={() => NavigationService.navigate('NewStudyGroup')}
        icon={
          <Icon
            name="plus"
            size={25}
            color="#f98181"
          />
        }
        buttonStyle={{marginRight: 10}}
        type="clear"
      />
    ),
    headerLeft: (
      <Button
        onPress={() => NavigationService.navigate('Profile', { owner: true })}
        icon={
          <Icon
            name="user"
            size={25}
            color="#f98181"
          />
        }
        buttonStyle={{marginLeft: 10}}
        type="clear"
      />
    )
  };

  constructor(props) {
    super(props)
    this.state = {
      study_groups: {},
      search_field: ""
    }
  }

  componentDidUpdate(prevProps) {
    if(typeof this.props.navigation.getParams !== 'undefined') {
      refresh = this.props.navigation.getParams('refresh')
      if(refresh && prevProps.isFocused != this.props.isFocused) {
        this.props.getStudyGroupsIndex()
      }
    }
  }

  componentDidMount() {
    this.props.getStudyGroupsIndex()
  }

  fetchToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token })
  }

  fetchStudyGroups = () => {
    this.props.getStudyGroupsIndex()
  }

  onSearchSubmit = () => {
    const { search_field } = this.state

    this.props.searchStudyGroup(search_field)
  }

  render() {
    const { ...props } = this.props;
    const { isLoading, study_groups } = this.props.study_groups;

    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <SearchBar
          platform="ios"
          placeholder="Search here..."
          onChangeText={(search_field) => this.setState({ search_field })}
          value={this.state.search_field}
          onSubmitEditing={this.onSearchSubmit}
          onClear={this.fetchStudyGroups}
        />
        {isLoading?
          <ActivityIndicator size="large" color="#e28e1d" /> :
          <List
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={this.fetchStudyGroups}
              />
            }
            // onPressFooter={this.onPressFooter}
            data={study_groups}
            {...props}
            extraData={study_groups}
          />
        }

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    // backgroundColor: '#e28e1d'
  },
  safeArea: {
    flex: 1,
  }
})

const mapStateToProps = state => ({
  study_groups: state.study_group_index
})

export default connect(mapStateToProps, { getStudyGroupsIndex, searchStudyGroup })(withNavigationFocus(StudyGroupScreen))