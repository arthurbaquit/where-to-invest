package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type Ativos struct {
	ID         uuid.UUID      `gorm:"primaryKey;autoIncrement;not null" json:"id"`
	Deleted_at gorm.DeletedAt `gorm:"type:timestamp;null" json:"deleted_at"`
	Nome       string         `gorm:"type:varchar(255);not null" json:"nome"`
	Valor      string         `gorm:"type:varchar(255);not null" json:"valor"`
	Tipo       string         `gorm:"type:varchar(255);not null" json:"tipo"`
	Quantidade int64          `gorm:"type:integer;not null" json:"quantidade"`
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
