package global

import (
	"server/config"

	"gorm.io/gorm"
)

var (
	DB     *gorm.DB
	Config config.Config
)
