/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const p1 =
  'This is a UI Component development environment for your React Native app. Here you can display and interact with your UI components as stories. A story is a single state of one or more UI components. You can have as many stories as you want. In other words a story is like a visual test case.';
const p2 =
  ' We have added some stories inside the "storybook/stories" directory for examples. Try editing the "storybook/stories/Welcome.js" file to edit this message.';

export default class Welcome extends Component {
  static propTypes = {
    repeat: PropTypes.number,
  };

  static defaultProps = {
    repeat: 1,
  };

  styles = {
    wrapper: {
      flex: 1,
      zIndex: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 24,
      position: 'relative',
      backgroundColor: '#eee',
      justifyContent: 'center',
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  };

  render() {
    return (
      <View style={this.styles.wrapper}>
        {Array.from({ length: this.props.repeat }).map((v, i) =>
          (<View key={i}>
            <Text style={this.styles.content}>{p1}</Text>
            <Text style={this.styles.content}>{p2}</Text>
          </View>),
        )}
      </View>
    );
  }
}
