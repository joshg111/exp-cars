// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'
import Exponent from 'exponent';

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    marginTop: Exponent.Constants.statusBarHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
