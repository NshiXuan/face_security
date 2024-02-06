package service

import (
	"fmt"
	"io"
	"os"
	"server/global"
	"server/schemas"
	"time"

	"github.com/Kagami/go-face"
)

type Face struct {
	Samples []face.Descriptor
	Ids     []int32
	Names   []string
}

var FaceData Face

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
	if err := os.WriteFile(fmt.Sprintf("./images/%d.jpeg", time.Now().Unix()), b, 0777); err != nil {
		return "", fmt.Errorf("write image err: %w", err)
	}
	FaceData.Samples = append(FaceData.Samples, face.Descriptor)
	FaceData.Ids = append(FaceData.Ids, int32(len(FaceData.Ids)+1))
	FaceData.Names = append(FaceData.Names, name)
	rec.SetSamples(FaceData.Samples, FaceData.Ids)
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
	face, err := rec.RecognizeSingle(b)
	if err != nil {
		return nil, fmt.Errorf("face recognition err: %v", err)
	}
	if face == nil {
		return nil, fmt.Errorf("未检出到人脸数据")
	}
	id := rec.ClassifyThreshold(face.Descriptor, 0.3)
	if id < 0 {
		return nil, fmt.Errorf("人脸数据不存在")
	}
	return &schemas.FindFaceResp{
		ID:   uint(id),
		Name: FaceData.Names[id-1],
	}, nil
}
