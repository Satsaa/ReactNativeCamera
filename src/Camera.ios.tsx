import React from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';
import { CameraProps, NativeProps, CameraApi } from './Camera';

const { CKCameraManager } = NativeModules;
const NativeCamera = requireNativeComponent<NativeProps>('CKCamera');

const Camera = React.forwardRef((props: CameraProps, ref: any) => {
  const nativeRef = React.useRef<any>();

  const {
    isActive = true,
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
  }));

  return (
    <NativeCamera
      ref={nativeRef}
      {...props}
      isActive={isActive}
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

export async function getCameraPermissions() {
  return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
}

export async function requestCameraPermission() {
  return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
}
