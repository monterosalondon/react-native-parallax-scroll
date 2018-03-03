/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, TouchableOpacity } from 'react-native';

export default class Header extends Component {
  static propTypes = {
    height: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    withAvatar: PropTypes.bool,
    animatedValue: PropTypes.instanceOf(Animated.Value)
  };

  static defaultProps = {
    height: 90,
    withAvatar: false,
    animatedValue: new Animated.Value(0)
  };

  styles = {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      position: 'relative'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(51,51,51,1)'
    },
    header: {
      color: '#fff',
      fontSize: 18,
      backgroundColor: 'transparent'
    },
    name: {
      color: '#fff',
      fontSize: 26,
      marginLeft: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent'
    },
    avatar: {
      width: 100,
      height: 100,
      marginTop: 80,
      marginLeft: 20,
      marginBottom: 20,
      borderRadius: 50
    }
  };

  render() {
    const scale = this.props.animatedValue.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0.8],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    });

    const translateY = this.props.animatedValue.interpolate({
      inputRange: [0, 160],
      outputRange: [0, 20],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    });

    const opacity = this.props.animatedValue.interpolate({
      inputRange: [0, this.props.height - 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const avatarScale = this.props.animatedValue.interpolate({
      inputRange: [0, this.props.height - 80],
      outputRange: [1, 0.5],
      extrapolateRight: 'clamp'
    });

    const avatarTranslateX = this.props.animatedValue.interpolate({
      inputRange: [-this.props.height + 80, 0, this.props.height - 80],
      outputRange: [60, 0, -80],
      extrapolateRight: 'clamp'
    });

    const avatarTranslateY = this.props.animatedValue.interpolate({
      inputRange: [-this.props.height + 80, 0, this.props.height - 80],
      outputRange: [50, 0, 190],
      extrapolateRight: 'clamp'
    });

    const textScale = this.props.animatedValue.interpolate({
      inputRange: [0, this.props.height - 80],
      outputRange: [1, 0.7],
      extrapolateRight: 'clamp'
    });

    const textTranslateX = this.props.animatedValue.interpolate({
      inputRange: [-this.props.height + 80, 0, this.props.height / 4],
      outputRange: [60, 0, 40],
      extrapolateRight: 'clamp'
    });

    const textTranslateY = this.props.animatedValue.interpolate({
      inputRange: [-this.props.height + 80, 0, this.props.height - 80],
      outputRange: [80, 0, 15],
      extrapolateRight: 'clamp'
    });

    let wrapperStyle = {};

    if (this.props.withAvatar) {
      wrapperStyle = {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      };
    }

    return (
      <Animated.View style={[this.styles.wrapper, wrapperStyle]} pointerEvents="box-none">
        <Animated.View style={[this.styles.background, { opacity }]} pointerEvents="box-none" />

        <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
          {this.props.withAvatar ? (
            <View>
              <Animated.Image
                style={[
                  this.styles.avatar,
                  {
                    transform: [
                      { scale: avatarScale },
                      { translateX: avatarTranslateX },
                      { translateY: avatarTranslateY }
                    ]
                  }
                ]}
                source={{ uri: `https://lorempixel.com/100/100/transport/?date=${Date.now()}` }}
              />

              <Animated.Text
                style={[
                  this.styles.name,
                  {
                    transform: [
                      { scale: textScale },
                      { translateX: textTranslateX },
                      { translateY: textTranslateY }
                    ]
                  }
                ]}
              >
                User Name
              </Animated.Text>
            </View>
          ) : (
            <TouchableOpacity onPress={this.props.onPress}>
              <Text style={this.styles.header}>Welcome to React Native Parallax Scroll</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </Animated.View>
    );
  }
}
