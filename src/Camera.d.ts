
declare const Camera: React.FC<CameraProps>;

export default Camera;

export type NativeProps = {
  focusMode: 'on' | 'off',
  zoomMode: 'on' | 'off',
  torchMode: 'on' | 'off',
  flashMode: 'auto' | 'on' | 'off',
  cameraType: 'front' | 'back',
  onReadCode?: (event: any) => void;
}

export type CameraProps = {
  focusMode?: boolean,
  zoomMode?: boolean,
  torchMode?: boolean,
  flashMode?: 'auto' | boolean,
  cameraType?: 'front' | 'back',
  onReadCode?: (event: any) => void;
}
