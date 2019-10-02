import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
// import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import store from './store';
import { Provider } from 'react-redux';

// import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import ForgotScreen from './screens/auth/ForgotScreen';
import StudyGroupScreen from './screens/main/StudyGroupScreen';
import AnnouncementScreen from './screens/main/AnnouncementScreen';
import RideshareScreen from './screens/main/RideshareScreen';
import CommerceScreen from './screens/main/CommerceScreen';
import AuthScreen from './screens/auth/AuthScreen';
import SignupScreen from './screens/auth/SignupScreen';

export default class App extends React.Component {
  render() {

    const MainNavigator = createBottomTabNavigator({
      // welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      forgot: { screen: ForgotScreen },
      signup: { screen: SignupScreen },
      main: {
        screen: createBottomTabNavigator({
          studyGroup: {
            screen: StudyGroupScreen,
            navigationOptions: {
              tabBarLabel: 'Study Group',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="group" size={26} color={tintColor} />
                 )
            },
          },
          announcement: {
            screen: AnnouncementScreen,
            navigationOptions: {
              tabBarLabel: 'Announcement',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="announcement" size={26} color={tintColor} />
                 )
            },
          },
          rideshare: {
            screen: RideshareScreen,
            navigationOptions: {
              tabBarLabel: 'Ridesharing',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="local-taxi" size={26} color={tintColor} />
                 )
            },
          },
          commerce: {
            screen: CommerceScreen,
            navigationOptions: {
              tabBarLabel: 'Selling',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="shop" size={26} color={tintColor} />
                 )
            },
          },
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: true, //swipe between different tabs.
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      defaultNavigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    const Navigation = createAppContainer(MainNavigator)

    return (
      <Provider store={store}>
          <View style={styles.container}>
            <Navigation />
          </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
    // marginTop: Platform.OS === 'android' ? 24 : 0
  },
});
