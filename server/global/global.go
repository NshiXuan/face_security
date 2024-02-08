package global

import (
	"fmt"
	"os"
	"server/config"
	"server/schemas"

	"github.com/Kagami/go-face"
	"gorm.io/gorm"
)

var (
	DB     *gorm.DB
	Config config.Config
	Rec    *face.Recognizer
)

const modelsDir = "models"

func NewRecognise() {
	rec, err := face.NewRecognizer(modelsDir)
	if err != nil {
		panic("[REC INIT ERROR] : " + err.Error())
	}
	Rec = rec
}

type Face struct {
	Samples []face.Descriptor
	Ids     []int32
	Names   []string
}

var FaceData = &Face{}

func InitFaceSamples() error {
	var faces []schemas.Face
	if err := DB.Find(&faces).Error; err != nil {
		return err
	}
	for _, face := range faces {
		b, err := os.ReadFile(face.ImageUrl)
		if err != nil {
			return fmt.Errorf("file readall err: %w", err)
		}
		sampleFace, err := Rec.RecognizeSingle(b)
		if err != nil {
			return fmt.Errorf("face recognize err: %w", err)
		}
		if sampleFace == nil {
			// 没识别到人脸时跳过
			continue
		}
		id := Rec.ClassifyThreshold(sampleFace.Descriptor, 0.3)
		if id > 0 {
			// sampleFace 数据已存在时跳过
			continue
		}
		FaceData.Ids = append(FaceData.Ids, int32(face.ID))
		FaceData.Samples = append(FaceData.Samples, sampleFace.Descriptor)
	}
	Rec.SetSamples(FaceData.Samples, FaceData.Ids)
	return nil
}
