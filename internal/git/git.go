package git

import (
	"bufio"
	"bytes"
	"fmt"
	"os/exec"
	"strings"
	"webview-test/internal/shared"
)

type Git struct{}

func (git *Git) GetVersion() (string, error) {
	cmd := exec.Command("git", "--version")
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}
	version := strings.TrimSpace(string(output)) // "git version x.x.x"
	lastSpaceIndex := strings.LastIndex(version, " ")
	if lastSpaceIndex > 0 {
		version = version[lastSpaceIndex+1:]
	}
	return version, nil
}

func (git *Git) GetCommits(path string, limit int, offset int) ([]*Commit, error) {
	format := strings.Join([]string{"%H", "%P", "%s", "%an", "%at"}, "%x00")
	output, err := exec.Command("git", "-C", path, "log", "--all", fmt.Sprintf("--skip=%d", offset), "-n", fmt.Sprintf("%d", limit), "--pretty=format:"+format).Output()
	if err != nil {
		return nil, err
	}
	commits := make([]*Commit, 0)
	scanner := bufio.NewScanner(bytes.NewReader(output))
	for scanner.Scan() {
		row := scanner.Text()
		columns := strings.Split(row, "\x00")
		commitAuthorDate, err := shared.StrUnixToTime(columns[4]) // %at
		if err != nil {
			return nil, err
		}
		commit := Commit{
			Hash:       columns[0], // %H
			ParentHash: columns[1], // %P
			Name:       columns[2], // %s
			AuthorName: columns[3], // &an
			AuthorDate: commitAuthorDate,
		}
		commits = append(commits, &commit)
	}
	if err = scanner.Err(); err != nil {
		return nil, err
	}
	return commits, nil
}

func (git *Git) GetBranches(path string) (branches []Branch, err error) {
	format := strings.Join([]string{"%(refname:short)", "%(objectname)"}, "%00")
	output, err := exec.Command("git", "-C", path, "for-each-ref", "refs/heads", "--format="+format).Output()
	if err != nil {
		return nil, err
	}
	scanner := bufio.NewScanner(bytes.NewReader(output))
	for scanner.Scan() {
		row := scanner.Text()
		columns := strings.Split(row, "\x00")
		branch := Branch{Name: columns[0], CommitHash: columns[1]}
		branches = append(branches, branch)
	}
	return branches, nil
}
