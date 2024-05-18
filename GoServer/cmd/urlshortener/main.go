package main

import (
	"log"
	"net/http"
	"urlshortener/api"
	db "urlshortener/internal"

	"github.com/gin-gonic/gin"
)

func main() {
	//close db after init
	defer db.Close()

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "From Go server")
	})
	router.POST("/originalUrl", api.HandleOriginalUrlPost)
	router.GET("/shortUrl/:shortUrl", api.HandleShortUrlGet)
	log.Println("Starting server on port :8080...")
	if err := router.Run("localhost:8080"); err != nil {
		log.Fatal("Falied to run server: ", err)
	}

}

// setting CORS Cross-origin resource sharing
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
