/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity } from 'react-native';

export default class Header extends Component {
  static propTypes = {
    useBg: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    animatedValue: PropTypes.instanceOf(Animated.Value),
  }

  static defaultProps = {
    useBg: false,
    animatedValue: new Animated.Value(0),
  }

  styles = {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      color: '#fff',
      fontSize: 18,
      backgroundColor: 'transparent',
    },
  };

  render() {
    const scale = this.props.animatedValue.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0.8],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const translateY = this.props.animatedValue.interpolate({
      inputRange: [0, 160],
      outputRange: [0, -30],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const translateTextY = this.props.animatedValue.interpolate({
      inputRange: [0, 160],
      outputRange: [0, 30],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const backgroundColor = this.props.useBg ? 'rgb(51,51,51)' : 'transparent';

    return (
      <Animated.View
        style={[this.styles.wrapper, { backgroundColor, transform: [{ translateY }] }]}
        pointerEvents="box-none"
      >
        <TouchableOpacity onPress={this.props.onPress}>
          <Animated.Text
            style={[this.styles.header, { transform: [{ scale }, { translateY: translateTextY }] }]}
          >
            Welcome to React Native Parallax Scroll
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
