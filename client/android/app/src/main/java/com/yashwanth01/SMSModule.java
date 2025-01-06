// android/app/src/main/java/com/yourapp/SMSModule.java
package com.yourapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.provider.Telephony;
import android.os.Bundle;
import android.telephony.SmsMessage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SMSModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private BroadcastReceiver smsReceiver;

    public SMSModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SMSModule";
    }

    @ReactMethod
    public void startSMSListener() {
        smsReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (Telephony.Sms.Intents.SMS_RECEIVED_ACTION.equals(intent.getAction())) {
                    for (SmsMessage smsMessage : Telephony.Sms.Intents.getMessagesFromIntent(intent)) {
                        WritableMap params = Arguments.createMap();
                        params.putString("originatingAddress", smsMessage.getOriginatingAddress());
                        params.putString("body", smsMessage.getMessageBody());
                        params.putDouble("timestamp", smsMessage.getTimestampMillis());

                        sendEvent("onSMSReceived", params);
                    }
                }
            }
        };

        IntentFilter filter = new IntentFilter();
        filter.addAction(Telephony.Sms.Intents.SMS_RECEIVED_ACTION);
        reactContext.registerReceiver(smsReceiver, filter);
    }

    @ReactMethod
    public void stopSMSListener() {
        if (smsReceiver != null) {
            reactContext.unregisterReceiver(smsReceiver);
            smsReceiver = null;
        }
    }

    private void sendEvent(String eventName, WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}