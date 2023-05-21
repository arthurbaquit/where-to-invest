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

	db.StartDB()
	db := db.GetDatabase()
	repo := repositories.NewRepository(db)

	handler.ApiHandler(&handler.Config{
		AtivosRepo: repo,
		R:          r,
	})

	r.Run(":" + port)
}
