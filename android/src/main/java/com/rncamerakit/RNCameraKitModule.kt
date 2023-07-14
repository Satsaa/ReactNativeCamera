package com.rncamerakit

import com.facebook.react.bridge.*
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import android.Manifest
import android.content.Context
import android.os.Build
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager

class RNCameraKitModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        // 0-indexed, rotates counter-clockwise
        // Values map to CameraX's Surface.ROTATION_* constants
        const val PORTRAIT = 0 // ⬆️
        const val LANDSCAPE_LEFT = 1 // ⬅️
        const val PORTRAIT_UPSIDE_DOWN = 2 // ⬇️
        const val LANDSCAPE_RIGHT = 3 // ➡️

        var RequestCode = 10

    }

    override fun getName(): String {
        return "RNCameraKitModule"
    }

    override fun getConstants(): Map<String, Any> {
        return hashMapOf(
                "PORTRAIT" to PORTRAIT,
                "PORTRAIT_UPSIDE_DOWN" to PORTRAIT_UPSIDE_DOWN,
                "LANDSCAPE_LEFT" to LANDSCAPE_LEFT,
                "LANDSCAPE_RIGHT" to LANDSCAPE_RIGHT
        )
    }

    @ReactMethod
    fun capture(options: ReadableMap, viewTag: Int, promise: Promise) {
        // CameraManager does not allow us to return values
        val context = reactContext
        val uiManager = context.getNativeModule(UIManagerModule::class.java)
        context.runOnUiQueueThread {
            val view = uiManager?.resolveView(viewTag) as CKCamera
            view.capture(options.toHashMap(), promise)
        }
    }
    
    @ReactMethod
    fun getCameraPermissionStatus(promise: Promise) {
        val status = ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.CAMERA)
        promise.resolve(status == PackageManager.PERMISSION_GRANTED)
    }

    @ReactMethod
    fun requestCameraPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            // API 21 and below always grants permission on app install
            return promise.resolve(true)
        }

        val activity = reactApplicationContext.currentActivity
        if (activity is PermissionAwareActivity) {
            val currentRequestCode = RequestCode++
            val listener = PermissionListener { requestCode: Int, _: Array<String>, grantResults: IntArray ->
                if (requestCode == currentRequestCode) {
                    val status = if (grantResults.isNotEmpty()) grantResults[0] else PackageManager.PERMISSION_DENIED
                    promise.resolve(status == PackageManager.PERMISSION_GRANTED)
                    return@PermissionListener true
                }
                return@PermissionListener false
            }
            activity.requestPermissions(arrayOf(Manifest.permission.CAMERA), currentRequestCode, listener)
        } else {
            promise.reject("NO_ACTIVITY", "No PermissionAwareActivity was found! Make sure the app has launched before calling this function.")
        }
    }

}