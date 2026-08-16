package git

type Branch struct {
	Name       string `json:"name"`
	CommitHash string `json:"commitHash"`
}
