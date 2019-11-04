import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import store from './store';
import { Provider } from 'react-redux';
import NavigationService from './services/NavigationService'

// importing screen
import WelcomeScreen from './screens/WelcomeScreen';
import ForgotScreen from './screens/auth/ForgotScreen';
import StudyGroupScreen from './screens/main/study_group/StudyGroupScreen';
import StudyGroupDetailScreen from './screens/main/study_group/StudyGroupDetailScreen';
import StudyGroupCommentScreen from './screens/main/study_group/StudyGroupCommentScreen'
import NewStudyGroupScreen from './screens/main/study_group/NewStudyGroupScreen';
import AnnouncementScreen from './screens/main/announcement/AnnouncementScreen';
import RideshareScreen from './screens/main/rideshare/RideshareScreen';
import CommerceScreen from './screens/main/commerce/CommerceScreen';
import ProfileScreen from './screens/main/profile/ProfileScreen';
import AuthScreen from './screens/auth/AuthScreen';
import SignupScreen from './screens/auth/SignupScreen';

const StudyGroupStack = createStackNavigator({
  StudyGroup: {
    screen: StudyGroupScreen,
    navigationOptions: {
      headerTitle: 'Study Group',
    }
  },
  StudyGroupDetail: {
    screen: StudyGroupDetailScreen,
  },
  StudyGroupComment: {
    screen: StudyGroupCommentScreen,
  },
  NewStudyGroup: {
    screen: NewStudyGroupScreen,
    navigationOptions: {
      headerTitle: 'New Study Group',
    }
  },
})

StudyGroupStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "StudyGroupComment") {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible
  };
};

const AnnounmentStack = createStackNavigator({
  Announcement: {
    screen: AnnouncementScreen,
    navigationOptions: {
      headerTitle: 'Announcement',
    }
  }
})

const RideshareStack = createStackNavigator({
  Rideshare: {
    screen: RideshareScreen,
    navigationOptions: {
      headerTitle: 'Rideshare',
    }
  }
})

const CommerceStack = createStackNavigator({
  Commerce: {
    screen: CommerceScreen,
    navigationOptions: {
      headerTitle: 'Selling',
    }
  }
})

// const ProfileStack = createStackNavigator({
//   Profile: {
//     screen: ProfileScreen,
//     navigationOptions: {
//       headerTitle: 'Profile',
//     }
//   }
// })

export default class App extends React.Component {
  render() {

    const MainNavigator = createBottomTabNavigator({
      // welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      forgot: { screen: ForgotScreen },
      signup: { screen: SignupScreen },
      main: {
        screen: createBottomTabNavigator({
          StudyGroup: {
            screen: StudyGroupStack,
            navigationOptions: {
              tabBarLabel: 'Study Group',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                  <Icon name="group" size={26} color={tintColor} />
              ),
            }
          },
          Announcement: {
            screen: AnnounmentStack,
            navigationOptions: {
              tabBarLabel: 'Announcement',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="announcement" size={26} color={tintColor} />
              ),
            }
          },
          Rideshare: {
            screen: RideshareStack,
            navigationOptions: {
              tabBarLabel: 'Ridesharing',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="local-taxi" size={26} color={tintColor} />
                 )
            },
          },
          Commerce: {
            screen: CommerceStack,
            navigationOptions: {
              tabBarLabel: 'Selling',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="shop" size={26} color={tintColor} />
                 )
            },
          },
          Profile: {
            screen: ProfileScreen,
            navigationOptions: {
              tabBarLabel: 'Profile',
              tabBarIcon: ({tintColor, activeTintColor}) => (
                 <Icon name="account-circle" size={26} color={tintColor} />
              )
            },
          }
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: true, //swipe between different tabs.
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          }
        })
      }
    }, {
      defaultNavigationOptions: {
        tabBarVisible: false,
      },
      lazy: true
    });

    const Navigation = createAppContainer(MainNavigator)

    return (
      <Provider store={store}>
          <View style={styles.container}>
            <Navigation
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
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
