package repositories

import (
	"fmt"
	"testing"

	"github.com/arthurbaquit/where-to-invest/models"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const dbSource = "file::memory:"

var (
	database *gorm.DB
	repo     IAtivosRepository
)

func beforeRun() {
	var err error
	database, err = gorm.Open(sqlite.Open(dbSource), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	}
	_ = database.AutoMigrate(&models.Ativos{})
	a1 := models.Ativos{
		Nome:    "a1",
		Posicao: 10,
		Tipo:    "FII",
		Nota:    10,
	}
	a2 := models.Ativos{
		Nome:    "a2",
		Posicao: 80,
		Tipo:    "FII",
		Nota:    20,
	}
	a3 := models.Ativos{
		Nome:    "a3",
		Posicao: 800,
		Tipo:    "Stocks",
		Nota:    20,
	}
	if err != nil {
		fmt.Println(err)
	}
	repo = NewRepository(database)
	err = repo.Create(&a1)
	if err != nil {
		fmt.Println(err)
	}
	err = repo.Create(&a2)
	if err != nil {
		fmt.Println(err)
	}
	err = repo.Create(&a3)
	if err != nil {
		fmt.Println(err)
	}

}

func TestUpdate(t *testing.T) {
	beforeRun()
	ativo := models.Ativos{
		Nome:       "a3",
		Posicao:    10,
		Quantidade: 10,
		Tipo:       "FII",
		Nota:       10,
	}
	err := repo.Update(&ativo)
	assert.Nil(t, err)
}

func TestGetAll(t *testing.T) {
	beforeRun()
	ativos, err := repo.GetAll()
	fmt.Println(ativos, err)
	assert.Nil(t, err)
	assert.Equal(t, 3, len(ativos))
}

func TestDelete(t *testing.T) {
	beforeRun()
	ativos, _ := repo.GetAll()
	assert.Equal(t, 3, len(ativos))
	err := repo.Delete(ativos[0].ID.String())
	assert.Nil(t, err)
	ativos, err = repo.GetAll()
	assert.Nil(t, err)
	assert.Equal(t, 2, len(ativos))
}

func TestGetByType(t *testing.T) {
	beforeRun()
	ativos, err := repo.GetByType("FII")
	assert.Nil(t, err)
	assert.Equal(t, 2, len(ativos))
}

func TestGetByID(t *testing.T) {
	beforeRun()
	ativos, _ := repo.GetAll()
	ativo, err := repo.GetByID(ativos[0].ID.String())
	assert.Nil(t, err)
	assert.Equal(t, ativos[0].ID.String(), ativo.ID.String())
}
