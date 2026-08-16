package web_view

import (
	_ "embed"

	webview "github.com/webview/webview_go"
)

//go:embed index.html
var html string

func CreateWebView() webview.WebView {
	webView := webview.New(false)
	webView.SetTitle("Git Desktop")
	webView.SetSize(480, 320, webview.HintNone)
	webView.SetHtml(html)
	return webView
}
