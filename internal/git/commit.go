package git

import "time"

type Commit struct {
	Hash       string    `json:"hash"`
	ParentHash string    `json:"parentHash"`
	Name       string    `json:"name"`
	AuthorName string    `json:"authorName"`
	AuthorDate time.Time `json:"authorDate"`
}
