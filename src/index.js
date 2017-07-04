/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { View, Animated, Dimensions, ListViewDataSource } from 'react-native';
import PropTypes from 'prop-types';
/* eslint-enable import/no-extraneous-dependencies */

const window = Dimensions.get('window');

const renderEmptyView = () => <View />;

const KEY = '__PARALLAX_SCROLL__';
const RATIO = 9 / 16;

export default class ParallaxScroll extends PureComponent {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    width: PropTypes.number,
    height: PropTypes.number,
    innerRef: PropTypes.func,
    sections: PropTypes.oneOfType([PropTypes.array]),
    onScroll: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    renderRow: PropTypes.func,
    renderItem: PropTypes.func,
    dataSource: PropTypes.instanceOf(ListViewDataSource),
    scrollStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    headerHeight: PropTypes.number,
    renderHeader: PropTypes.func,
    isHeaderFixed: PropTypes.bool,
    parallaxHeight: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    scrollableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isBackgroundScalable: PropTypes.bool,
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
    data: null,
    style: {},
    width: window.width,
    height: window.height,
    innerRef: null,
    sections: null,
    children: null,
    onScroll: null,
    renderRow: null,
    dataSource: null,
    renderItem: null,
    scrollStyle: {},
    headerHeight: 45,
    renderHeader: null,
    isHeaderFixed: false,
    parallaxHeight: window.width * RATIO,
    useNativeDriver: false,
    scrollableComponent: Animated.ScrollView,
    isBackgroundScalable: true,
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

    this._onAnimatedScrollWithND = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
      {
        listener: this._onScroll,
        useNativeDriver: true,
      },
    );
    this._onAnimatedScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
      {
        listener: this._onScroll,
      },
    );
  }

  render() {
    const {
      data,
      style: wrapperStyle,
      width,
      height,
      sections,
      children,
      renderRow,
      renderItem,
      dataSource,
      scrollStyle,
      renderHeader,
      useNativeDriver,
      contentContainerStyle,
      renderParallaxBackground,
      renderParallaxForeground,
      ...scrollViewProps
    } = this.props;

    const style = [scrollStyle, { width, height }];
    const isRenderChildComponents =
      !(data && renderItem) &&
      !((sections && renderItem) || (sections && sections[0].renderItem)) &&
      !(dataSource && renderRow);
    let ScrollableComponent = this.props.scrollableComponent;

    if (useNativeDriver && Animated.ScrollView !== ScrollableComponent) {
      ScrollableComponent = Animated.createAnimatedComponent(ScrollableComponent);
    }

    return (
      <View style={[wrapperStyle, { width, height }]} onLayout={this._onLayout}>

        {renderParallaxBackground && this._renderParallaxBackground(!!renderHeader)}

        <ScrollableComponent
          {...scrollViewProps}
          ref={this._ref}
          style={style}
          throttle={16}
          onScroll={
            this.props.useNativeDriver ? this._onAnimatedScrollWithND : this._onAnimatedScroll
          }
          data={data && renderItem && this._getFlatData(data)}
          sections={sections && this._getSectionData(sections)}
          renderRow={dataSource && renderRow && this._renderRow}
          renderItem={renderItem && this._renderItem}
          dataSource={dataSource && renderRow && this._getDataSource(dataSource)}
          scrollEventThrottle={16}
          stickyHeaderIndices={[isRenderChildComponents && renderHeader ? 0 : -1]}
          contentContainerStyle={[contentContainerStyle, { width, minHeight: height }]}
          stickySectionHeadersEnabled
          onMoveShouldSetResponder={() => false}
          onStartShouldSetResponderCapture={() => false}
        >
          {isRenderChildComponents && renderHeader && this._renderHeader()}

          {isRenderChildComponents && this._renderEmptyView()}

          {isRenderChildComponents && children}
        </ScrollableComponent>

        {renderParallaxForeground && this._renderParallaxForeground(!!renderHeader)}

        {!isRenderChildComponents && renderHeader && this._renderHeader()}
      </View>
    );
  }

  _ref = (ref) => {
    if (typeof this.props.innerRef === 'function' && ref && ref._component) {
      this.props.innerRef(ref._component);
    }
  };

  _renderParallaxBackground(withHeader) {
    const {
      width,
      headerHeight,
      parallaxHeight: height,
      isBackgroundScalable,
      renderParallaxBackground,
      fadeOutParallaxBackground,
      parallaxBackgroundScrollSpeed,
    } = this.props;
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
          transform: [{ translateY }, { scale }],
        }}
        pointerEvents="box-none"
      >
        {renderParallaxBackground()}
      </Animated.View>
    );
  }

  _renderParallaxForeground(withHeader) {
    const {
      width,
      headerHeight,
      parallaxHeight: height,
      isForegroundTouchable,
      renderParallaxForeground,
      fadeOutParallaxForeground,
      parallaxForegroundScrollSpeed,
    } = this.props;

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
          height: bHeight,
          opacity,
          transform: [{ translateY }],
        }}
        pointerEvents={isForegroundTouchable ? 'box-none' : 'none'}
      >
        {renderParallaxForeground()}
      </Animated.View>
    );
  }

  _renderHeader() {
    const {
      width,
      headerHeight: height,
      renderHeader,
      isHeaderFixed,
      parallaxHeight,
      headerBackgroundColor,
      headerFixedBackgroundColor,
    } = this.props;

    const wrapperStyle = {
      flex: 1,
      position: 'absolute',
      top: 0,
      width,
      height,
      zIndex: 1,
    };
    const style = {
      flex: 1,
      width,
      height,
    };

    if (!isHeaderFixed) {
      style.transform = [
        {
          translateY: this.scrollY.interpolate({
            inputRange: [parallaxHeight - height, parallaxHeight],
            outputRange: [0, -height],
            extrapolate: 'clamp',
          }),
        },
      ];
    }

    if (!this.props.useNativeDriver && headerBackgroundColor) {
      style.backgroundColor = this.scrollY.interpolate({
        inputRange: [0, parallaxHeight - height],
        outputRange: [headerBackgroundColor, headerFixedBackgroundColor],
        extrapolate: 'clamp',
      });
    } else if (this.props.useNativeDriver && headerBackgroundColor) {
      style.backgroundColor = headerBackgroundColor;
    }

    return (
      <View style={wrapperStyle} pointerEvents="box-none">
        <Animated.View style={style} pointerEvents="box-none">
          {renderHeader()}
        </Animated.View>
      </View>
    );
  }

  // eslint-disable-next-line
  _getFlatData(data) {
    return [{ key: KEY }, ...data];
  }

  // eslint-disable-next-line
  _getDataSource(dataSource) {
    return dataSource.cloneWithRowsAndSections({
      [KEY]: [''],
      ...dataSource._dataBlob,
    });
  }

  _getSectionData(sections) {
    if (this.props.renderItem) {
      return [{ data: [{ key: KEY }], key: KEY }, ...sections];
    }

    return [{ data: [{ key: KEY }], key: KEY, renderItem: this._renderEmptyView }, ...sections];
  }

  _renderRow = (rowData, sectionID, rowID, highlightRow) => {
    if (sectionID === KEY) {
      return this._renderEmptyView();
    }

    return this.props.renderRow(rowData, sectionID, rowID, highlightRow);
  };

  _renderItem = (e) => {
    if (e.item.key === KEY) {
      return this._renderEmptyView();
    }

    return this.props.renderItem(e);
  };

  _renderEmptyView = () => <View style={{ height: this.props.parallaxHeight }} />;

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
