/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
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

storiesOf('ParallaxScroll', module)
  .addDecorator(withKnobs)
  .add('with bacground', () =>
    (<ParallaxScroll
      parallaxHeight={number('Parallax height', 250)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', true)}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with header', () =>
    (<ParallaxScroll
      renderHeader={() => <Header />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', true)}
      headerFixedBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('without header background', () =>
    (<ParallaxScroll
      renderHeader={() => <Header />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', '')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', true)}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with foreground', () =>
    (<ParallaxScroll
      renderHeader={() => <Header />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  )
  .add('with native driver', () =>
    (<ParallaxScroll
      renderHeader={() => <Header />}
      headerHeight={number('Header height', 50)}
      isHeaderFixed={boolean('Is header fixed', false)}
      parallaxHeight={number('Parallax height', 250)}
      useNativeDriver
      isBackgroundScalable={boolean('Is background scalable', true)}
      headerBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 0)')}
      onChangeHeaderVisibility={action('onChangeHeaderVisibility')}
      renderParallaxBackground={() => bacground}
      fadeOutParallaxBackground={boolean('Fade out background', false)}
      renderParallaxForeground={() => <Foreground />}
      fadeOutParallaxForeground={boolean('Fade out foreground', true)}
      headerFixedBackgroundColor={text('Header bacground color', 'rgba(51, 51, 51, 1)')}
      parallaxBackgroundScrollSpeed={number('Background scroll speed', 5)}
      parallaxForegroundScrollSpeed={number('Foreground scroll speed', 2.5)}
    >
      <Welcome repeat={number('Repeat text times', 5)} />
    </ParallaxScroll>),
  );
