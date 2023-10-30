package com.paybuttonreactnative

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import company.tap.tappaybutton.PayButton
import company.tap.tappaybutton.PayButtonStatusDelegate
import company.tap.tappaybutton.PayButtonType


class PayButtonReactNativeViewManager : SimpleViewManager<View>() {
  override fun getName() = "PayButtonReactNativeView"
  lateinit var customView: PayButton

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    var testView = LayoutInflater.from(reactContext).inflate(R.layout.cardview, null)
    customView = testView.findViewById(R.id.payForm)
    return testView
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
    return MapBuilder.of(
      "onErrorCallback", MapBuilder.of("registrationName", "onErrorCallback"),
      "onSuccessCallback", MapBuilder.of("registrationName", "onSuccessCallback"),
      "onOrderCreatedCallback", MapBuilder.of("registrationName", "onOrderCreatedCallback"),
      "onChargeCreatedCallback", MapBuilder.of("registrationName", "onChargeCreatedCallback"),
      "onReadyCallback", MapBuilder.of("registrationName", "onReadyCallback"),
      "onClickedCallback", MapBuilder.of("registrationName", "onClickedCallback"),
      "onCanceledCallback", MapBuilder.of("registrationName", "onCanceledCallback"),
    )
  }

  @ReactProp(name = "config")
  fun setConfig(view: View, config: ReadableMap) {
    print(config.toString())
    val linkedHashMap = LinkedHashMap<String, Any>(config.toHashMap())
    val value:String = linkedHashMap.getValue("buttonType") as String
    var buttonType: PayButtonType = PayButtonType.BENEFIT_PAY
    enumValues<PayButtonType>().forEach { if(it.name.lowercase().snakeToCamelCase().uppercase() == value.uppercase()) {
      buttonType = it
    }
    }
    customView.initPayButton(view.context, linkedHashMap ,buttonType, object :
      PayButtonStatusDelegate {
      override fun onChargeCreated(data: String) {
        val event = Arguments.createMap().apply {
          putString("data", data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onChargeCreatedCallback", event)
        Log.e("configTest", data)
      }

      override fun onOrderCreated(data: String) {
        val event = Arguments.createMap().apply {
          putString("data", data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onOrderCreatedCallback", event)
        Log.e("configTest", data)
      }
      override fun onError(error: String) {
        val event = Arguments.createMap().apply {
          putString("data", error)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onErrorCallback", event)
        Log.e("configTest", error)
      }

      override fun onCancel() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onCanceledCallback", event)
        Log.e("configTest", "onCancel")
      }
      override fun onReady() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onReadyCallback", event)
        Log.e("configTest", "onReady")
      }

      override fun onClick() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onClickedCallback", event)
        Log.e("configTest", "onClick")
      }

      override fun onSuccess(data: String) {
        val event = Arguments.createMap().apply {
          putString("data",data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onSuccessCallback", event)
        Log.e("configTest", data)
      }
    })
  }

  fun String.snakeToCamelCase(): String {
    val pattern = "_[a-z]".toRegex()
    return replace(pattern) { it.value.last().uppercase() }
  }
}
