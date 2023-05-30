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
		Meta:    10,
	}
	a2 := models.Ativos{
		Nome:    "a2",
		Posicao: 80,
		Tipo:    "FII",
		Meta:    20,
	}
	if err != nil {
		fmt.Println(err)
	}
	repo = NewRepository(database)
	err = repo.Update(&a1)
	if err != nil {
		fmt.Println(err)
	}
	err = repo.Update(&a2)
	if err != nil {
		fmt.Println(err)
	}

}

func TestUpdate(t *testing.T) {
	beforeRun()
	ativo := models.Ativos{
		Nome:    "a3",
		Posicao: 10,
		Tipo:    "FII",
		Meta:    10,
	}
	err := repo.Update(&ativo)
	assert.Nil(t, err)
}

func TestGetAll(t *testing.T) {
	beforeRun()
	ativos, err := repo.GetAll()
	fmt.Println(ativos, err)
	assert.Nil(t, err)
	assert.Equal(t, 2, len(ativos))
}

func TestDelete(t *testing.T) {
	beforeRun()
	ativos, _ := repo.GetAll()
	assert.Equal(t, 2, len(ativos))
	err := repo.Delete(ativos[0].ID.String())
	assert.Nil(t, err)
	ativos, err = repo.GetAll()
	assert.Nil(t, err)
	assert.Equal(t, 1, len(ativos))
}
