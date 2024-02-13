package controller

import (
	"server/schemas"
	"server/service"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func CreateRole(ctx *gin.Context) {
	var req schemas.CreateRoleReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.CreateRole(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}
