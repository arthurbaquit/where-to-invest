package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type AssetClasses struct {
	ID             uuid.UUID      `gorm:"primaryKey;not null" json:"id"`
	Deleted_at     gorm.DeletedAt `gorm:"type:timestamp;null" json:"deleted_at"`
	Reits          int64          `gorm:"type:integer;not null" json:"reits"`
	FixedIncome    int64          `gorm:"type:integer;not null" json:"fixed_income"`
	NationalStocks int64          `gorm:"type:integer;not null" json:"national_stocks"`
	ForeignStocks  int64          `gorm:"type:integer;not null" json:"foreign_stocks"`
	Crypto         int64          `gorm:"type:integer;not null" json:"crypto"`
	FII            int64          `gorm:"type:integer;not null" json:"fii"`
}

func (ac *AssetClasses) TableName() string {
	return "asset_classes"
}

func (ac *AssetClasses) BeforeCreate(*gorm.DB) error {
	if ac.ID == uuid.Nil {
		ac.ID = uuid.Must(uuid.NewV4())
	}
	return nil
}
