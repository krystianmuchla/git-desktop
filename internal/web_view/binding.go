package web_view

import (
	"webview-test/internal"
	"webview-test/internal/fs"
	"webview-test/internal/git"

	webview "github.com/webview/webview_go"
)

func BindWebView(webView webview.WebView, git git.Git) error {
	// keep alphabetical order
	if err := webView.Bind("getCurrentPath", fs.GetCurrentPath); err != nil {
		return err
	}
	if err := webView.Bind("getGitBranches", git.GetBranches); err != nil {
		return err
	}
	if err := webView.Bind("getGitCommits", git.GetCommits); err != nil {
		return err
	}
	if err := webView.Bind("getGitVersion", git.GetVersion); err != nil {
		return err
	}
	if err := webView.Bind("getPathSeparator", fs.GetPathSeparator); err != nil {
		return err
	}
	if err := webView.Bind("listDir", fs.ListDir); err != nil {
		return err
	}
	if err := webView.Bind("openLink", internal.OpenLink); err != nil {
		return err
	}
	if err := webView.Bind("serializePath", fs.SerializePath); err != nil {
		return err
	}
	return nil
}
