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
	// TODO(nsx): 这个无效？
	// DeletedAt DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

type Gender int

const (
	Male   Gender = 0
	Female Gender = 1
)

// TODO(nsx): 有问题 id 与 gender 都为了 bigint
// CREATE TABLE `users` (`id` bigint unsigned AUTO_INCREMENT,`ctime` datetime(3) NULL,`mtime` datetime(3) NULL,`password` varchar(200) NOT NULL,`name` varchar(20) NOT NULL,`gender` bigint,`phone` varchar(11) NOT NULL,`address` varchar(50) NOT NULL,PRIMARY KEY (`id`))

// CREATE TABLE `users` (`id` bigint unsigned AUTO_INCREMENT,`ctime` datetime(3) NULL,`mtime` datetime(3) NULL,`password` varchar(200) NOT NULL,`name` varchar(20) NOT NULL,`gender` bigint NOT NULL COMMENT ”'0表示女 1表示男”',`phone` varchar(11) NOT NULL,`address` varchar(50) NOT NULL,PRIMARY KEY (`id`))
type User struct {
	Base
	Password string `gorm:"type:varchar(200);not null"`
	Name     string `gorm:"type:varchar(20);not null"`
	// Gender   Gender `gorm:"type:enum(0,1);not null;comment:'0表示女 1表示男'"`
	Gender  Gender `gorm:"type:int;not null;comment:'0表示女 1表示男'"`
	Phone   string `gorm:"type:varchar(11);not null"`
	Address string `gorm:"type:varchar(50);not null"`

	// TODO(nsx): 是否需要添加出生日期
	// Birthday *time.Time `gorm:"type:datetime"`
}

// CREATE TABLE `roles` (`id` bigint unsigned AUTO_INCREMENT,`ctime` datetime(3) NULL,`mtime` datetime(3) NULL,`name` varchar(20) NOT NULL,`desc` varchar(200) NOT NULL DEFAULT ”,PRIMARY KEY (`id`))
type Role struct {
	Base
	Name string `gorm:"type:varchar(20);not null"`
	Desc string `gorm:"type:varchar(200);default:'';not null"`
}

// CREATE TABLE `user_roles` (`id` bigint unsigned AUTO_INCREMENT,`ctime` datetime(3) NULL,`mtime` datetime(3) NULL,`user_id` longtext,`role_id` longtext,PRIMARY KEY (`id`))
type UserRole struct {
	Base
	UserId string
	RoleId string
}

// REATE TABLE `faces` (`id` bigint unsigned AUTO_INCREMENT,`ctime` datetime(3) NULL,`mtime` datetime(3) NULL,`name` varchar(20) NOT NULL,`image` varchar(200) NOT NULL DEFAULT ”,`remark` varchar(200) NOT NULL DEFAULT ”,PRIMARY KEY (`id`))
type Face struct {
	Base
	Name   string `gorm:"type:varchar(20);not null"`
	Image  string `gorm:"type:varchar(200);default:'';not null"`
	Remark string `gorm:"type:varchar(200);default:'';not null"`
}
