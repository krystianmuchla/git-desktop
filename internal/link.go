package internal

import (
	"fmt"
	"os/exec"
	"runtime"
)

func OpenLink(link string) error {
	switch runtime.GOOS {
	case "linux":
		return exec.Command("xdg-open", link).Start()
	case "windows":
		return exec.Command("roundll32", "url.dll,FileProtocolHandler", link).Start()
	case "darwin": // macOS
		return exec.Command("open", link).Start()
	default:
		return fmt.Errorf("unsupported platform")
	}
}
