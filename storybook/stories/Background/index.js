/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Image } from 'react-native';

export default function Background(props) {
  return (
    <Image
      {...props}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
}
