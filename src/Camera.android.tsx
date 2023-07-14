import React from 'react';
import { requireNativeComponent, findNodeHandle, NativeModules } from 'react-native';
import { CameraApi } from './types';
import { CameraProps, NativeProps } from './Camera';

const { RNCameraKitModule } = NativeModules;
const NativeCamera = requireNativeComponent<NativeProps>('CKCameraManager');

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
    capture: async (options = {}) => {
      // Because RN doesn't support return types for ViewManager methods
      // we must use the general module and tell it what View it's supposed to be using
      return await RNCameraKitModule.capture(options, findNodeHandle(nativeRef.current ?? null));
    },
    requestDeviceCameraAuthorization: () => {
      throw new Error('Not implemented');
    },
    checkDeviceCameraAuthorizationStatus: () => {
      throw new Error('Not implemented');
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
