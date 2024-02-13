package controller

import (
	"server/schemas"
	"server/service"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func CreateUser(ctx *gin.Context) {
	var req schemas.CreateUserReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.CreateUser(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func GetUserByName(ctx *gin.Context) {
	name := ctx.Query("name")
	faces, err := service.GetUserByName(name)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, faces)
}
