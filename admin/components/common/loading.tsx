import React from 'react';
import { Loader } from '@mantine/core';
const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'transparent',
      }}
    >
      <Loader variant="bars" />
    </div>
  );
};

export default Loading;
