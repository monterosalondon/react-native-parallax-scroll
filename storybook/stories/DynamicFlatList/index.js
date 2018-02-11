/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import { View, Button, FlatList, Dimensions } from 'react-native';
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

export default class DynamicFlatList extends Component {
  state = {
    data: [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }],
    length: 3,
  };

  onForegroundPress = () => {
    const random = Math.floor(Math.random() * 1000);

    this.timeout = setTimeout(() => {
      this.setState(({ data, length }) => {
        const newLength = length + 1;
        const newData = [...data, { key: newLength, value: 1 }];

        return {
          data: newData,
          length: newLength,
        };
      });
    }, random);
  };

  render() {
    return (
      <ParallaxScroll
        style={style}
        data={this.state.data}
        renderItem={({ item: { key } }) => <Welcome repeat={key} />}
        renderHeader={() => <Header onPress={action('onPress Header')} />}
        headerHeight={number('Header height', 50)}
        keyExtractor={({ key }) => `${key}`}
        onHeaderFixed={action('onHeaderFixed')}
        isHeaderFixed={boolean('Is header fixed', false)}
        parallaxHeight={number('Parallax height', 250)}
        useNativeDriver={boolean('Use native driver', false)}
        scrollableComponent={FlatList}
        isBackgroundScalable={boolean('Is background scalable', true)}
        headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
        onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
        renderParallaxForeground={() =>
          <Foreground text="Touch to load more data" onPress={this.onForegroundPress} />}
        renderParallaxBackground={() =>
          <Background
            source={{ uri: `https://lorempixel.com/600/400/nightlife/?date=${Date.now()}` }}
          />}
        fadeOutParallaxBackground={boolean('Fade out background', false)}
        fadeOutParallaxForeground={boolean('Fade out foreground', true)}
        headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
        parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
        parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
      />
    );
  }
}
