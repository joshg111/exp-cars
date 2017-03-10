// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import '../I18n/I18n' // keep before root container
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Font, Components } from 'exponent';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  state: Object

  constructor(...args) {
    super(...args);

    // const networkInterface = createNetworkInterface({uri:'http://10.0.2.2:8080/graphql'});
    const networkInterface = createNetworkInterface({uri:'http://ec2-54-153-42-75.us-west-1.compute.amazonaws.com:8080/graphql'});
    this.client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id,
    });

    this.state = {
      fontsAreLoaded: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({fontsAreLoaded: true});
  }

  render () {
    if (!this.state.fontsAreLoaded) {
      return <Components.AppLoading />;
    }
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <ApolloProvider client={this.client}>
          <RootContainer />
        </ApolloProvider>
      </ThemeProvider>

    )
  }
}

export default App
