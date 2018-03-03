# Changelog

All notable changes to this project will be documented in this file.

### 1.5.4 - 2018-03-3

#### Fixed

* header translateY when header is fixed and `headerFixedTransformY` is too big

### 1.5.3 - 2018-02-1

#### Fixed

* issues #17, #18 - fatal error when `scrollableComponent` prop is missing

### 1.5.2 - 2018-02-11

#### Fixed

* issue #15 - scroll to top if scrollableComponent is not Animatable

### 1.5.1 - 2017-12-01

#### Fixed

* onHeaderFixed - Header interpolation when parallxHeight === headerHeight

### 1.5.0 - 2017-11-06

#### Added

* onHeaderFixed - A callback function that is invoked when the header will attach to the top
* headerFixedTransformY - This number indicating how much the fixed header should move upwards during the scroll. Used as the hack to change fixed header height during scroll
