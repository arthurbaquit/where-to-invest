package main

import (
	"log"
	"os"

	"github.com/arthurbaquit/where-to-invest/db"
	"github.com/arthurbaquit/where-to-invest/handler"
	"github.com/arthurbaquit/where-to-invest/repositories"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func EnableCORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	r.Use(EnableCORSMiddleware())
	db.StartDB()
	db := db.GetDatabase()
	repo := repositories.NewRepository(db)

	handler.ApiHandler(&handler.Config{
		AtivosRepo: repo,
		R:          r,
	})

	r.Run(":" + port)
}
