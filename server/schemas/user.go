package schemas

import (
	"database/sql"
	"time"
)

type DeletedAt sql.NullTime

type Base struct {
	ID        uint      `gorm:"primarykey" json:"id,omitempty"`
	CreatedAt time.Time `gorm:"column:ctime" json:"ctime,omitempty"`
	UpdatedAt time.Time `gorm:"column:mtime" json:"mtime,omitempty"`
	DeletedAt DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

type Gender int

const (
	Male   Gender = 0
	Female Gender = 1
)

type User struct {
	Base
	Password string `gorm:"type:varchar(200);not null"`
	Name     string `gorm:"type:varchar(20);not null"`
	Gender   Gender
	Phone    string `gorm:"type:varchar(11);not null"`
	Address  string `gorm:"type:varchar(50);not null"`
	// Birthday *time.Time `gorm:"type:datetime"`
}

type Role struct {
	Base
	Name string `gorm:"type:varchar(20);not null"`
	Desc string `gorm:"type:varchar(200);default:'';not null"`
}

type UserRole struct {
	Base
	UserId string
	RoleId string
}

type Face struct {
	Base
	Name   string `gorm:"type:varchar(20);not null"`
	Image  string `gorm:"type:varchar(200);default:'';not null"`
	Remark string `gorm:"type:varchar(200);default:'';not null"`
}
