/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Animated, TouchableOpacity } from 'react-native';

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
      outputRange: [0, 20],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const backgroundColor = this.props.useBg ? 'rgb(51,51,51)' : 'transparent';

    return (
      <Animated.View
        style={[this.styles.wrapper, { backgroundColor }]}
        pointerEvents="box-none"
      >
        <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={this.styles.header} >
              Welcome to React Native Parallax Scroll
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
