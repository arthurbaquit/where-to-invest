package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type Ativos struct {
	ID         uuid.UUID      `gorm:"primaryKey;not null" json:"id"`
	Deleted_at gorm.DeletedAt `gorm:"type:timestamp;null" json:"deleted_at"`
	Nome       string         `gorm:"type:varchar(255);not null" json:"nome"`
	Posicao    int64          `gorm:"type:integer;not null" json:"posicao"`
	Quantidade int64          `gorm:"type:integer;not null" json:"quantidade"`
	Tipo       string         `gorm:"type:varchar(255);not null" json:"tipo"`
	Nota       int64          `gorm:"type:integer;not null" json:"nota"`
}

func (a *Ativos) TableName() string {
	return "ativos"
}

func (a *Ativos) BeforeCreate(*gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.Must(uuid.NewV4())
	}
	return nil
}
