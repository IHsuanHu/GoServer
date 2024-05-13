package api

import (
	"net/http"
	db "urlshortener/internal"

	"github.com/gin-gonic/gin"
)

func HandleOriginalUrlPost(c *gin.Context) {
	var req struct {
		OriginalUrl string `json:"originalUrl"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	shortUrl, err := db.GenerateUrl(req.OriginalUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate a short URL"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"shortUrl": shortUrl})
}

func HandleShortUrlGet(c *gin.Context) {
	shortUrl := c.Param("shortUrl")
	originalUrl, err := db.FindOriginalUrl(shortUrl)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No such original URL found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"original": originalUrl})
}
