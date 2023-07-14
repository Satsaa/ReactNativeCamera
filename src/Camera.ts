import { ViewProps } from 'react-native';

declare const Camera: React.FC<CameraProps>;

export default Camera;

export type NativeProps = ViewProps & {
  isActive: boolean,
  focusMode: 'on' | 'off',
  zoomMode: 'on' | 'off',
  torchMode: 'on' | 'off',
  flashMode: 'auto' | 'on' | 'off',
  cameraType: 'front' | 'back',
  scanBarcode: boolean,
  onReadCode?: (event: ReadCodeEventData) => void;
}

export type CameraProps = ViewProps & {
  isActive?: boolean,
  focusMode?: boolean,
  zoomMode?: boolean,
  torchMode?: boolean,
  flashMode?: 'auto' | boolean,
  cameraType?: 'front' | 'back',
  onReadCode?: (event: ReadCodeEventData) => void;
}

export type ReadCodeEventData = {
  nativeEvent: {
    codeStringValue: string;
  };
};
