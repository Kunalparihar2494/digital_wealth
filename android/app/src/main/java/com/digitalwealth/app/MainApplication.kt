package com.digitalwealth.app

import android.app.Application
import android.content.res.Configuration
import android.os.Build
import android.util.Log
import java.security.Security
import org.conscrypt.Conscrypt
// Purana duplicate import hata diya hai

import com.google.android.gms.security.ProviderInstaller
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
      this,
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Add manual packages here if needed
            }

          override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

          override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

          override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()

    // Step 1: Security Provider Update (Google Play Services)
    try {
      ProviderInstaller.installIfNeeded(this)
      Log.d("NetworkFix", "Provider installed successfully")
    } catch (e: Exception) {
      Log.e("NetworkFix", "Provider installation failed", e)
    }

    // Step 2: Conscrypt Fix (Purane Android versions ke liye TLS 1.2 support)
    // Ye line Sectigo certificates ko purane phones par validate karne mein help karegi
    try {
      Security.insertProviderAt(Conscrypt.newProvider(), 1)
      Log.d("NetworkFix", "Conscrypt provider added")
    } catch (e: Exception) {
      Log.e("NetworkFix", "Conscrypt installation failed", e)
    }

    // React Native configurations
    DefaultNewArchitectureEntryPoint.releaseLevel = try {
      ReleaseLevel.valueOf(BuildConfig.REACT_NATIVE_RELEASE_LEVEL.uppercase())
    } catch (e: IllegalArgumentException) {
      ReleaseLevel.STABLE
    }

    loadReactNative(this)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}