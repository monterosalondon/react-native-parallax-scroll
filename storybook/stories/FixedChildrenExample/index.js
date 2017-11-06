/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { action } from '@storybook/react-native';
import { text, boolean, number } from '@storybook/addon-knobs';

import Header from '../Header';
import Welcome from '../Welcome';
import Foreground from '../Foreground';
import Background from '../Background';

import ParallaxScroll from '../../../src';

const window = Dimensions.get('window');

const style = { backgroundColor: '#000' };
const contentWrapperStyle = {
  position: 'relative',
  width: window.width,
  height: 50,
  backgroundColor: '#222',
};

export default class FixedChildrenExample extends Component {
  state = {
    isHeaderFixed: false,
  }

  render() {
    return (
      <View>
        <ParallaxScroll
          style={style}
          renderHeader={({ animatedValue }) =>
            <Header onPress={action('onPress Header')} useBg animatedValue={animatedValue} />
          }
          headerHeight={number('Header height', 90)}
          isHeaderFixed={boolean('Is header fixed', true)}
          onHeaderFixed={isHeaderFixed => this.setState({ isHeaderFixed })}
          parallaxHeight={number('Parallax height', 250)}
          useNativeDriver={boolean('Use native driver', true)}
          isBackgroundScalable={boolean('Is background scalable', true)}
          headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
          headerFixedTransformY={text('Header fixed transform y', 30)}
          isForegroundTouchable={boolean('Is foreground touchable', false)}
          renderParallaxBackground={() =>
            <Background source={{ uri: `https://lorempixel.com/600/400/nightlife/?date=${Date.now()}` }} />
          }
          onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
          renderParallaxForeground={() => <Foreground onPress={action('onPress Foreground')} />}
          fadeOutParallaxBackground={boolean('Fade out background', false)}
          fadeOutParallaxForeground={boolean('Fade out foreground', true)}
          headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
          parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
          parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
        >
          <View style={contentWrapperStyle}>
            <View style={contentWrapperStyle} />
          </View>

          <Welcome repeat={number('Repeat text times', 5)} />
        </ParallaxScroll>

        {
          this.state.isHeaderFixed &&
          <View style={[contentWrapperStyle, { position: 'absolute', top: 60 }]}>
            <View style={contentWrapperStyle} />
          </View>
        }
      </View>
    );
  }
}
