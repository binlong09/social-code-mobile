import React from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import store from './store';
import { Provider } from 'react-redux';
import NavigationService from './services/NavigationService'
import { loadToken } from './actions/auth_actions'

// importing screen
import WelcomeScreen from './screens/WelcomeScreen';
import ForgotScreen from './screens/auth/ForgotScreen';
import StudyGroupScreen from './screens/main/study_group/StudyGroupScreen';
import StudyGroupDetailScreen from './screens/main/study_group/StudyGroupDetailScreen';
import StudyGroupCommentScreen from './screens/main/study_group/StudyGroupCommentScreen'
import NewStudyGroupScreen from './screens/main/study_group/NewStudyGroupScreen';
import NewStudyGroupPostScreen from './screens/main/study_group/NewStudyGroupPostScreen'
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
  NewStudyGroupPost: {
    screen: NewStudyGroupPostScreen,
    navigationOptions: {
      headerTitle: 'New Post'
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Your Profile'
    }
  }
})

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
          // Profile: {
          //   screen: ProfileScreen,
          //   navigationOptions: {
          //     tabBarLabel: 'Profile',
          //     tabBarIcon: ({tintColor, activeTintColor}) => (
          //        <Icon name="account-circle" size={26} color={tintColor} />
          //     )
          //   },
          // }
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: true, //swipe between different tabs.
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
          defaultNavigationOptions: {
            tabBarVisible: false
          }
        })
      }
    }, {
      defaultNavigationOptions: {
        // Set this to false because we do not want to submit app
        // with placeholder to Apple store
        tabBarVisible: false,
      },
      lazy: true
    });

    const Navigation = createAppContainer(MainNavigator)

    return (
      <Provider store={store}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? 'padding' : 'height'}
            enabled>
            <Navigation
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </KeyboardAvoidingView>
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
