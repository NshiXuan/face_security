package controller

import (
	"server/schemas"
	"server/service"

	"github.com/gin-gonic/gin"
)

// TODO(nsx): 封装 log
func CreateFace(ctx *gin.Context) {
	var req schemas.FaceCreateReq
	if err := ctx.ShouldBind(&req); err != nil {
		RespErrorWithMsg(ctx, CodeInvalidParam, err.Error())
		return
	}
	msg, err := service.CreateFace(&req)
	if err != nil {
		RespErrorWithMsg(ctx, CodeServerBusy, err.Error())
		return
	}
	RespSuccessWithMsg(ctx, msg, nil)
}

func FindFace(ctx *gin.Context) {
	var req schemas.FaceFindReq
	if err := ctx.ShouldBind(&req); err != nil {
		RespErrorWithMsg(ctx, CodeInvalidParam, err.Error())
		return
	}
	resp, err := service.FindFace(&req)
	if err != nil {
		RespErrorWithMsg(ctx, CodeServerBusy, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func FindFaceList(ctx *gin.Context) {
	resp, err := service.FindFaceList()
	if err != nil {
		RespErrorWithMsg(ctx, CodeServerBusy, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}
