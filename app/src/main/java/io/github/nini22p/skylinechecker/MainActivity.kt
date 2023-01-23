package io.github.nini22p.skylinechecker

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.ComponentActivity

@SuppressLint("SetJavaScriptEnabled")
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val myWebView = WebView(this)
        setContentView(myWebView)
        myWebView.settings.javaScriptEnabled = true
        myWebView.settings.allowFileAccessFromFileURLs = true;
        myWebView.settings.allowUniversalAccessFromFileURLs = true;
        myWebView.loadUrl("file:///android_asset/index.html")
    }
}
