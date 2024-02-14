package controller

import (
	"server/schemas"
	"server/service"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// TODO(nsx): 修改与 user 的返回值一致？
func CreateFace(ctx *gin.Context) {
	var req schemas.CreateFaceReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	msg, err := service.CreateFace(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccessWithMsg(ctx, msg, nil)
}

func FindFace(ctx *gin.Context) {
	var req schemas.FindFaceReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.FindFace(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func GetFaces(ctx *gin.Context) {
	resp, err := service.GetFaces()
	if err != nil {
		zap.S().Error(err)
		RespError(ctx, CodeInternalServerError)
		return
	}
	RespSuccess(ctx, resp)
}

func GetFaceByName(ctx *gin.Context) {
	name := ctx.Query("name")
	faces, err := service.GetFaceByName(name)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, faces)
}

// TODO(nsx): finish update api
func UpdateFace(ctx *gin.Context) {

}

func RemoveFace(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	if err := service.RemoveFace(int64(id)); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, nil)
}
