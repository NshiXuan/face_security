package models

import (
	"server/global"

	"github.com/Kagami/go-face"
)

const modelsDir = "models"

func NewRecognise() {
	rec, err := face.NewRecognizer(modelsDir)
	if err != nil {
		panic("[REC INIT ERROR] : " + err.Error())
	}
	global.Rec = rec
}
