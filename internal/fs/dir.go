package fs

import (
	"os"
)

func ListDir(path Path) ([]string, error) {
	entries, err := os.ReadDir(SerializePath(path))
	if err != nil {
		return nil, err
	}
	dirs := make([]string, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() {
			dirs = append(dirs, entry.Name())
		}
	}
	return dirs, nil
}
