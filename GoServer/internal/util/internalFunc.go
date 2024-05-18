package util

import (
	"math/rand"
	"time"
)

const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

// Generate hash value
func GenerateBase62(n int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, n)
	for i := range b {
		b[i] = base62[rand.Int63()%int64(len(base62))]
	}
	return string(b)
}
