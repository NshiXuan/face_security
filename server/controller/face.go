package controller

import (
	"server/schemas"
	"server/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

// TODO(nsx): 封装 log
func CreateFace(ctx *gin.Context) {
	var req schemas.FaceCreateReq
	if err := ctx.ShouldBind(&req); err != nil {
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	msg, err := service.CreateFace(&req)
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccessWithMsg(ctx, msg, nil)
}

func FindFace(ctx *gin.Context) {
	var req schemas.FaceFindReq
	if err := ctx.ShouldBind(&req); err != nil {
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.FindFace(&req)
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func GetFaceList(ctx *gin.Context) {
	resp, err := service.GetFaceList()
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func RemoveFace(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Query("id"))
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	if err := service.RemoveFace(int64(id)); err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
	}
	RespSuccess(ctx, nil)
}
