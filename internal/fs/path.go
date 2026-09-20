package fs

import (
	"os"
	"path/filepath"
	"strings"
)

type Path []string

func GetCurrentPath() (Path, error) {
	path, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	return deserializePath(path), nil
}

func GetPathSeparator() string {
	return string(filepath.Separator)
}

func SerializePath(path Path) string {
	return filepath.Join(path...)
}

func deserializePath(path string) Path {
	deserialized := strings.Split(filepath.Clean(path), GetPathSeparator())
	if len(deserialized) > 0 && deserialized[0] == "" {
		deserialized[0] = "/"
	}
	return deserialized
}
