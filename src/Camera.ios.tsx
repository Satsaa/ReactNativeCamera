import React from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';
import { CameraApi } from './types';
import { CameraProps, NativeProps } from './Camera';

const { CKCameraManager } = NativeModules;
const NativeCamera = requireNativeComponent<NativeProps>('CKCamera');

const Camera = React.forwardRef((props: CameraProps, ref: any) => {
  const nativeRef = React.useRef<any>();

  const {
    cameraType = 'back',
    flashMode = 'auto',
    focusMode = true,
    torchMode = false,
    zoomMode = true,
    onReadCode,
  } = props;

  React.useImperativeHandle<any, CameraApi>(ref, () => ({
    capture: async () => {
      return await CKCameraManager.capture({});
    },
    requestDeviceCameraAuthorization: async () => {
      return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
    },
    checkDeviceCameraAuthorizationStatus: async () => {
      return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
    },
  }));

  return (
    <NativeCamera
      ref={nativeRef}
      {...props}
      cameraType={cameraType}
      flashMode={typeof flashMode === 'boolean' ? flashMode ? 'on' : 'off' : 'auto'}
      torchMode={torchMode ? 'on' : 'off'}
      focusMode={focusMode ? 'on' : 'off'}
      zoomMode={zoomMode ? 'on' : 'off'}
      scanBarcode={!!onReadCode}
      onReadCode={onReadCode}
    />
  );
});

export default Camera;
