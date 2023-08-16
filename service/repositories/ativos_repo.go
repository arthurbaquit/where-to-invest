package repositories

import (
	. "github.com/arthurbaquit/where-to-invest/models"
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type IAtivosRepository interface {
	GetAll() ([]Ativos, error)
	GetByID(id string) (Ativos, error)
	Create(ativo *Ativos) error
	Update(ativo *Ativos) error
	Delete(id string) error
	GetByType(tipo string) ([]Ativos, error)
}

type AtivosRepository struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *AtivosRepository {
	return &AtivosRepository{
		DB: db,
	}
}

func (r AtivosRepository) GetAll() ([]Ativos, error) {
	var ativos []Ativos
	err := r.DB.Find(&ativos).Error
	return ativos, err
}

func (r AtivosRepository) GetByID(id string) (Ativos, error) {
	var ativo Ativos
	err := r.DB.First(&ativo, id).Error
	return ativo, err
}

func (r AtivosRepository) Create(ativo *Ativos) error {
	if ativo.ID == uuid.Nil {
		ativo.ID = uuid.Must(uuid.NewV4())
	}
	return r.DB.Create(&ativo).Error
}

func (r AtivosRepository) Update(ativo *Ativos) error {
	return r.DB.Save(&ativo).Error
}

func (r AtivosRepository) Delete(id string) error {
	return r.DB.Where("id = ?", id).Delete(&Ativos{}).Error
}

func (r AtivosRepository) GetByType(tipo string) ([]Ativos, error) {
	var ativos []Ativos
	err := r.DB.Where("tipo = ?", tipo).Find(&ativos).Error
	return ativos, err
}
