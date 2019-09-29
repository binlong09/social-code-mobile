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
import MapScreen from './screens/main/MapScreen';
import AuthScreen from './screens/auth/AuthScreen';
import SignupScreen from './screens/auth/SignupScreen';

export default class App extends React.Component {
  render() {

    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      forgot: { screen: ForgotScreen },
      signup: { screen: SignupScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          // deck: { screen: DeckScreen },
          // review: {
          //   screen: createStackNavigator({
          //     review: { screen: ReviewScreen },
          //     settings: { screen: SettingsScreen }
          //   }),
          //   navigationOptions: {
          //     tabBarIcon: ({ tintColor }) => {
          //       return <Icon name="star" size={30} color={tintColor} />;
          //     },
          //     title: 'Liked Foods'
          //   }
          // }
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
