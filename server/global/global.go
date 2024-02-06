package global

import (
	"server/config"

	"github.com/Kagami/go-face"
	"gorm.io/gorm"
)

var (
	DB     *gorm.DB
	Config config.Config
	Rec    *face.Recognizer
)
