package controller

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

// TODO(nsx): 移动到 schemas 目录
type FaceCreateReq struct {
	Name string                `form:"name" binding:"required"`
	File *multipart.FileHeader `form:"file" binding:"required"`
}

type FaceFindReq struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
}

// TODO(nsx): 封装 service 与 log
func Create(ctx *gin.Context) {
	var form FaceCreateReq
	if err := ctx.ShouldBind(&form); err != nil {
		RespErrorWithMsg(ctx, CodeInvalidParam, err.Error())
		return
	}
	file := form.File
	name := form.Name

	f, err := file.Open()
	if err != nil {
		fmt.Printf("file open err: %v\n", err)
		RespError(ctx, CodeServerBusy)
		return
	}
	b, err := io.ReadAll(f)
	if err != nil {
		fmt.Printf("file readall err: %v\n", err)
		RespError(ctx, CodeServerBusy)
		return
	}

	face, err := Rec.RecognizeSingle(b)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		RespError(ctx, CodeServerBusy)
		return
	}
	if face == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "未检出到人脸数据",
		})
		return
	}
	// 判断人脸数据是否存在
	id := Rec.ClassifyThreshold(face.Descriptor, 0.3)
	if id > 0 {
		ctx.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "数据已存在，无需重复录入",
		})
		return
	}

	if err := os.WriteFile(fmt.Sprintf("./images/%d.jpeg", time.Now().Unix()), b, 0777); err != nil {
		fmt.Println("write file error: %w", err)
		RespError(ctx, CodeServerBusy)
		return
	}
	FaceData.Samples = append(FaceData.Samples, face.Descriptor)
	FaceData.Ids = append(FaceData.Ids, int32(len(FaceData.Ids)+1))
	FaceData.Names = append(FaceData.Names, name)
	Rec.SetSamples(FaceData.Samples, FaceData.Ids)
	ctx.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "数据录入成功",
	})
}

func Find(ctx *gin.Context) {
	var form FaceFindReq
	if err := ctx.ShouldBind(&form); err != nil {
		RespErrorWithMsg(ctx, CodeInvalidParam, err.Error())
		return
	}
	file := form.File
	f, _ := file.Open()
	b, _ := io.ReadAll(f)

	face, err := Rec.RecognizeSingle(b)
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "系统异常：" + err.Error(),
		})
		return
	}
	if face == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "未检出到人脸数据",
		})
		return
	}
	// id := Rec.ClassifyThreshold(face.Descriptor, define.Tolerance)
	id := Rec.ClassifyThreshold(face.Descriptor, 0.3)
	if id < 0 {
		ctx.JSON(http.StatusOK, gin.H{
			"code": -1,
			"msg":  "人脸数据不存在",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "识别成功",
		"data": gin.H{
			"id":   id,
			"name": FaceData.Names[id-1],
		},
	})
}
