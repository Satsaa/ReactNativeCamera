import * as CameraModule from './Camera';

export default CameraModule.default;
export type CameraProps = CameraModule.CameraProps;
export type ReadCodeEventData = CameraModule.ReadCodeEventData;
export const getCameraPermissions = CameraModule.getCameraPermissions;
export const requestCameraPermissions = CameraModule.requestCameraPermissions;
