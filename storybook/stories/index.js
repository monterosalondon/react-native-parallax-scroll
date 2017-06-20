/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FlatList, ListView, SectionList } from 'react-native';
import { storiesOf, action } from '@storybook/react-native';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import ParallaxScroll from '../../src';

import Header from './Header';
import Welcome from './Welcome';
import Foreground from './Foreground';
import Background from './Background';

const bacground = (
  <Background source={{ uri: 'https://pp.userapi.com/c630728/v630728630/38999/C-13dha7VxI.jpg' }} />
);

const dateSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

storiesOf('ParallaxScroll', module)
  .addDecorator(withKnobs)
  .add('with bacground', () =>
    (<ParallaxScroll
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', false)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with header', () =>
    (<ParallaxScroll
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', true)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', false)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('without header background', () =>
    (<ParallaxScroll
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', false)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', '')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with foreground', () =>
    (<ParallaxScroll
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', true)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', false)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground onPress={action('onPress Foreground')} />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with native driver', () =>
    (<ParallaxScroll
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', true)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('List view', () =>
    (<ParallaxScroll
      dataSource={dateSource.cloneWithRows([1, 2, 3, 4, 5])}
      renderRow={item => <Welcome repeat={item} />}
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', true)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', true)}
      scrollableComponent={ListView}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    />),
  )
  .add('Flat list', () =>
    (<ParallaxScroll
      data={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }]}
      renderItem={({ item: { key } }) => <Welcome repeat={key} />}
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', true)}
      scrollableComponent={FlatList}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    />),
  )
  .add('Section list homogenous', () =>
    (<ParallaxScroll
      sections={[
        { data: [{ key: 1 }], key: 1 },
        { data: [{ key: 2 }], key: 2 },
        { data: [{ key: 3 }], key: 3 },
        { data: [{ key: 4 }], key: 4 },
      ]}
      renderItem={({ item: { key } }) => <Welcome repeat={key} />}
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver={boolean('Use native driver', true)}
      scrollableComponent={SectionList}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    />),
  )
  .add('Section list heterogeneous', () =>
    (<ParallaxScroll
      sections={[
        { data: [{ key: 1 }], key: 1, renderItem: ({ item: { key } }) => <Welcome repeat={key} /> },
        { data: [{ key: 2 }], key: 2, renderItem: ({ item: { key } }) => <Welcome repeat={key} /> },
        { data: [{ key: 3 }], key: 3, renderItem: ({ item: { key } }) => <Welcome repeat={key} /> },
        { data: [{ key: 4 }], key: 4, renderItem: ({ item: { key } }) => <Welcome repeat={key} /> },
        { data: [{ key: 5 }], key: 5, renderItem: ({ item: { key } }) => <Welcome repeat={key} /> },
      ]}
      renderHeader={() => <Header onPress={action('onPress Header')} />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver
      scrollableComponent={SectionList}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      isForegroundTouchable={boolean('Is foreground touchable', false)}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header fixed bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    />),
  );
