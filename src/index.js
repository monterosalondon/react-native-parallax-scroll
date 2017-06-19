/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
/* eslint-enable import/no-extraneous-dependencies */

const window = Dimensions.get('window');

const renderEmptyView = () => <View />;

const RATIO = 9 / 16;

export default class ParallaxScroll extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    width: PropTypes.number,
    height: PropTypes.number,
    onScroll: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    scrollStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    headerHeight: PropTypes.number,
    renderHeader: PropTypes.func,
    isHeaderFixed: PropTypes.bool,
    parallaxHeight: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    isHeaderTouchable: PropTypes.bool,
    scrollableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isBackgroundScalable: PropTypes.bool,
    isBackgroundTouchable: PropTypes.bool,
    isForegroundTouchable: PropTypes.bool,
    headerBackgroundColor: PropTypes.string,
    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
    ]),
    onChangeHeaderVisibility: PropTypes.func,
    renderParallaxBackground: PropTypes.func,
    renderParallaxForeground: PropTypes.func,
    fadeOutParallaxForeground: PropTypes.bool,
    fadeOutParallaxBackground: PropTypes.bool,
    headerFixedBackgroundColor: PropTypes.string,
    parallaxBackgroundScrollSpeed: PropTypes.number,
    parallaxForegroundScrollSpeed: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    width: window.width,
    height: window.height,
    children: null,
    onScroll: null,
    scrollStyle: {},
    headerHeight: 45,
    renderHeader: null,
    isHeaderFixed: false,
    parallaxHeight: window.width * RATIO,
    useNativeDriver: false,
    isHeaderTouchable: false,
    scrollableComponent: Animated.ScrollView,
    isBackgroundScalable: true,
    isBackgroundTouchable: false,
    isForegroundTouchable: false,
    headerBackgroundColor: 'rgba(0, 0, 0, 0)',
    contentContainerStyle: {},
    onChangeHeaderVisibility: () => {},
    renderParallaxBackground: renderEmptyView,
    renderParallaxForeground: renderEmptyView,
    fadeOutParallaxForeground: false,
    fadeOutParallaxBackground: false,
    headerFixedBackgroundColor: 'rgba(0, 0, 0, 1)',
    parallaxBackgroundScrollSpeed: 5,
    parallaxForegroundScrollSpeed: 5,
  };

  scrollY = new Animated.Value(0);
  isHeaderVisibible = true;

  constructor(props) {
    super(props);

    if (props.useNativeDriver) {
      this._onAnimatedScrollWithND = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
        {
          listener: this._onScroll,
          useNativeDriver: true,
        },
      );
    } else {
      this._onAnimatedScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
        {
          listener: this._onScroll,
        },
      );
    }
  }

  render() {
    const {
      style: wrapperStyle,
      width,
      height,
      children,
      scrollStyle,
      headerHeight,
      renderHeader,
      isHeaderFixed,
      parallaxHeight,
      isHeaderTouchable,
      isBackgroundScalable,
      isBackgroundTouchable,
      isForegroundTouchable,
      contentContainerStyle,
      headerBackgroundColor,
      onChangeHeaderVisibility,
      renderParallaxBackground,
      renderParallaxForeground,
      fadeOutParallaxForeground,
      fadeOutParallaxBackground,
      headerFixedBackgroundColor,
      parallaxForegroundScrollSpeed,
      parallaxBackgroundScrollSpeed,
      ...scrollViewProps
    } = this.props;

    const style = [scrollStyle, { width, height }];
    const ScrollableComponent = this.props.scrollableComponent;

    return (
      <View style={[wrapperStyle, { width, height }]} onLayout={this._onLayout}>
        {renderParallaxBackground &&
          this._renderParallaxBackground({
            width,
            withHeader: !!renderHeader,
            headerHeight,
            parallaxHeight,
            isBackgroundScalable,
            isBackgroundTouchable,
            renderParallaxBackground,
            fadeOutParallaxBackground,
            parallaxBackgroundScrollSpeed,
          })}

        {renderParallaxForeground &&
          this._renderParallaxForeground({
            width,
            withHeader: !!renderHeader,
            headerHeight,
            parallaxHeight,
            isForegroundTouchable,
            renderParallaxForeground,
            fadeOutParallaxForeground,
            parallaxForegroundScrollSpeed,
          })}

        {this._renderHeader({
          width,
          headerHeight,
          renderHeader,
          isHeaderFixed,
          parallaxHeight,
          isHeaderTouchable,
          headerBackgroundColor,
          headerFixedBackgroundColor,
        })}

        <ScrollableComponent
          {...scrollViewProps}
          style={style}
          throttle={16}
          onScroll={
            this.props.useNativeDriver ? this._onAnimatedScrollWithND : this._onAnimatedScroll
          }
          scrollEventThrottle={16}
          contentContainerStyle={{ width, minHeight: height }}
        >
          {this._renderContent({ children, parallaxHeight, contentContainerStyle })}
        </ScrollableComponent>
      </View>
    );
  }

  _renderParallaxBackground({
    width,
    withHeader,
    headerHeight,
    parallaxHeight: height,
    isBackgroundScalable,
    isBackgroundTouchable,
    renderParallaxBackground,
    fadeOutParallaxBackground,
    parallaxBackgroundScrollSpeed,
  }) {
    const bHeight = withHeader ? height - headerHeight : height;

    const translateY = !bHeight
      ? 0
      : this.scrollY.interpolate({
        inputRange: [0, bHeight],
        outputRange: [0, -(bHeight / parallaxBackgroundScrollSpeed)],
        extrapolateRight: 'extend',
        extrapolateLeft: 'clamp',
      });

    const scale = !isBackgroundScalable || !bHeight
      ? 1
      : this.scrollY.interpolate({
        inputRange: [-bHeight, 0],
        outputRange: [3, 1],
        extrapolateLeft: 'extend',
        extrapolateRight: 'clamp',
      });

    const opacity = !fadeOutParallaxBackground || !bHeight
      ? 1
      : this.scrollY.interpolate({
        inputRange: [0, bHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          width,
          height,
          opacity,
          zIndex: isBackgroundTouchable ? 1 : 0,
          transform: [{ translateY }, { scale }],
        }}
        pointerEvents="box-none"
      >
        {renderParallaxBackground()}
      </Animated.View>
    );
  }

  _renderParallaxForeground({
    width,
    withHeader,
    headerHeight,
    parallaxHeight: height,
    isForegroundTouchable,
    renderParallaxForeground,
    fadeOutParallaxForeground,
    parallaxForegroundScrollSpeed,
  }) {
    const bHeight = withHeader ? height - headerHeight : height;

    const translateY = !bHeight
      ? 1
      : this.scrollY.interpolate({
        inputRange: [0, bHeight],
        outputRange: [0, -(bHeight / parallaxForegroundScrollSpeed)],
        extrapolate: 'clamp',
      });

    const opacity = !fadeOutParallaxForeground || !bHeight
      ? 1
      : this.scrollY.interpolate({
        inputRange: [0, bHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          width,
          zIndex: isForegroundTouchable ? 1 : 0,
          height: bHeight,
          opacity,
          transform: [{ translateY }],
        }}
        pointerEvents="box-none"
      >
        {renderParallaxForeground()}
      </Animated.View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _renderContent({ children, parallaxHeight, contentContainerStyle }) {
    const style = [contentContainerStyle, { marginTop: parallaxHeight }];

    return (
      <View style={style}>
        {children}
      </View>
    );
  }

  _renderHeader({
    width,
    headerHeight: height,
    renderHeader,
    isHeaderFixed,
    parallaxHeight,
    isHeaderTouchable,
    headerBackgroundColor,
    headerFixedBackgroundColor,
  }) {
    if (!renderHeader) {
      return null;
    }

    const translateY = isHeaderFixed
      ? 0
      : this.scrollY.interpolate({
        inputRange: [parallaxHeight - height, parallaxHeight],
        outputRange: [0, -height],
        extrapolate: 'clamp',
      });

    const style = {
      flex: 1,
      position: 'absolute',
      width,
      height,
      zIndex: isHeaderTouchable ? 1 : 0,
      transform: [{ translateY }],
    };

    if (!this.props.useNativeDriver && headerBackgroundColor) {
      style.backgroundColor = this.scrollY.interpolate({
        inputRange: [0, parallaxHeight - height],
        outputRange: [headerBackgroundColor, headerFixedBackgroundColor],
        extrapolate: 'clamp',
      });
    }

    return (
      <Animated.View style={style} pointerEvents="box-none">
        {renderHeader()}
      </Animated.View>
    );
  }

  _onScroll = (e) => {
    const { onScroll, parallaxHeight, onChangeHeaderVisibility } = this.props;
    const isHeaderVisibible = e.nativeEvent.contentOffset.y < parallaxHeight;

    if (onScroll) {
      onScroll(e);
    }

    if (this.isHeaderVisibible !== isHeaderVisibible) {
      this.isHeaderVisibible = isHeaderVisibible;
      onChangeHeaderVisibility(isHeaderVisibible);
    }
  };
}
