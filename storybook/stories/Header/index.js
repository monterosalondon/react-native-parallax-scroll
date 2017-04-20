/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const header = 'Welcome to React Native Parallax Scroll';

export default class Header extends Component {
  styles = {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      color: '#fff',
      fontSize: 18,
    },
  };

  render() {
    return (
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>{header}</Text>
      </View>
    );
  }
}
