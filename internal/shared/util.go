package shared

import (
	"strconv"
	"time"
)

func StrUnixToTime(strUnix string) (time.Time, error) {
	unix, err := strconv.ParseInt(strUnix, 10, 64)
	if err != nil {
		return time.Time{}, err
	}
	return time.Unix(unix, 0).UTC(), nil
}
