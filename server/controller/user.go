package controller

import (
	"server/schemas"
	"server/service"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// TODO(nsx): 密码加密
func CreateUser(ctx *gin.Context) {
	var req schemas.CreateUserReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	user, err := service.CreateUser(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, user)
}

func GetUsers(ctx *gin.Context) {
	resp, err := service.GetUsers()
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, resp)
}

func GetUserByName(ctx *gin.Context) {
	name := ctx.Query("name")
	users, err := service.GetUserByName(name)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, users)
}

func GetUserById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	user, err := service.GetUserById(int64(id))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, user)
}

func UpdateUser(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	var req schemas.UpdateUserReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	user, err := service.UpdateUser(int64(id), &req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, user)
}

func DeleteUser(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	user, err := service.DeleteUser(int64(id))
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	RespSuccess(ctx, user)
}
