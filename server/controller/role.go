package controller

import (
	"server/schemas"
	"server/service"
	"strconv"

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

func GetRoles(ctx *gin.Context) {
	resp, err := service.GetRoles()
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func UpdateRole(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	var req schemas.UpdateRoleReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.UpdateRole(int64(id), &req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func DeleteRole(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	resp, err := service.DeleleRole(int64(id))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}
