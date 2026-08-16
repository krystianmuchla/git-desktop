package main

import (
	"webview-test/internal/git"
	"webview-test/internal/web_view"
)

func main() {
	webView := web_view.CreateWebView()
	defer webView.Destroy()
	g := git.Git{}
	if err := web_view.BindWebView(webView, g); err != nil {
		panic(err)
	}
	webView.Run()
}
