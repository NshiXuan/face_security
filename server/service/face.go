package service

import (
	"fmt"
	"io"
	"os"
	"server/global"
	"server/schemas"
	"time"
)

func CreateFace(req *schemas.FaceCreateReq) (string, error) {
	name := req.Name
	file := req.File
	rec := global.Rec
	f, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("file open err: %w", err)
	}
	b, err := io.ReadAll(f)
	if err != nil {
		return "", fmt.Errorf("file readall err: %w", err)
	}
	face, err := rec.RecognizeSingle(b)
	if err != nil {
		return "", fmt.Errorf("face recognize err: %w", err)
	}
	if face == nil {
		return "未检出到人脸数据", nil
	}
	id := rec.ClassifyThreshold(face.Descriptor, 0.3)
	if id > 0 {
		return "数据已存在,无需重复录入", nil
	}

	faceData := global.FaceData
	faceData.Samples = append(faceData.Samples, face.Descriptor)
	faceData.Ids = append(faceData.Ids, int32(len(faceData.Ids)+1))
	rec.SetSamples(faceData.Samples, faceData.Ids)

	filename := time.Now().Unix()
	path := fmt.Sprintf("./images/%d.jpeg", filename)
	if err := os.WriteFile(path, b, 0777); err != nil {
		return "", fmt.Errorf("write image err: %w", err)
	}

	var sface schemas.Face
	sface.Name = name
	sface.ImageUrl = path
	if err := global.DB.Save(&sface).Error; err != nil {
		return "", err
	}
	return "录入成功", nil
}

func FindFace(req *schemas.FaceFindReq) (*schemas.FindFaceResp, error) {
	file := req.File
	rec := global.Rec
	f, err := file.Open()
	if err != nil {
		return nil, fmt.Errorf("file open err: %v", err)
	}
	b, err := io.ReadAll(f)
	if err != nil {
		return nil, fmt.Errorf("file readall err: %v", err)
	}
	sampleFace, err := rec.RecognizeSingle(b)
	if err != nil {
		return nil, fmt.Errorf("face recognition err: %v", err)
	}
	if sampleFace == nil {
		return nil, fmt.Errorf("未检出到人脸数据")
	}
	id := rec.ClassifyThreshold(sampleFace.Descriptor, 0.3)
	if id < 0 {
		return nil, fmt.Errorf("人脸数据不存在")
	}

	var face schemas.Face
	if err := global.DB.First(&face, id).Error; err != nil {
		return nil, err
	}
	return &schemas.FindFaceResp{
		ID:   int64(id),
		Name: face.Name,
	}, nil
}

func FindFaceList() ([]schemas.Face, error) {
	var faces []schemas.Face
	if err := global.DB.Find(&faces).Error; err != nil {
		return nil, err
	}
	return faces, nil
}
