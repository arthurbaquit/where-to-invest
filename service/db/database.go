package db

import (
	"log"
	"os"
	"time"

	"github.com/arthurbaquit/where-to-invest/models"
	"github.com/gin-gonic/gin"
	postgres "go.elastic.co/apm/module/apmgormv2/v2/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func StartDB() {
	var database *gorm.DB
	var err error
	port := os.Getenv("DB_PORT")
	url := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	sslmode := os.Getenv("DB_SSLMODE")

	str := "host=" + url + " port=" + port + " user=" + user + " dbname=" + dbname + " password=" + password + " sslmode=" + sslmode
	database, err = gorm.Open(postgres.Open(str), &gorm.Config{})

	if err != nil {
		log.Fatal("error: ", err)
	}

	db = database
	config, _ := db.DB()
	_ = db.AutoMigrate(&models.Ativos{})

	config.SetMaxIdleConns(10)
	config.SetMaxOpenConns(100)
	config.SetConnMaxLifetime(time.Hour)
}

func SetContext(ctx *gin.Context) {
	db = db.WithContext(ctx.Request.Context())
}

func GetDatabase() *gorm.DB {
	return db
}
