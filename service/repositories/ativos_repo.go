package repositories

import (
	. "github.com/arthurbaquit/where-to-invest/models"
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type IAtivosRepository interface {
	GetAll() ([]Ativos, error)
	GetByID(id uuid.UUID) error
	Create(ativo *Ativos) error
	Update(ativo *Ativos) error
	Delete(id uuid.UUID) error
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

func (r AtivosRepository) GetByID(id uuid.UUID) error {
	var ativo Ativos
	return r.DB.First(&ativo, id).Error
}

func (r AtivosRepository) Create(ativo *Ativos) error {
	return r.DB.Create(&ativo).Error
}

func (r AtivosRepository) Update(ativo *Ativos) error {
	return r.DB.Save(&ativo).Error
}

func (r AtivosRepository) Delete(id uuid.UUID) error {
	return r.DB.Delete(&Ativos{}, id).Error
}
