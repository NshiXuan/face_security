package controller

import (
	"log"
	"net/http"
	"server/schemas"
	"server/service"
	"strconv"
	"strings"

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

func DeleteUsers(ctx *gin.Context) {
	idStrs := strings.Split(ctx.Query("ids"), ",")
	var ids []int64
	for _, val := range idStrs {
		id, err := strconv.Atoi(val)
		if err != nil {
			log.Panicln(err)
			RespErrorWithMsg(ctx, http.StatusBadRequest, err)
			return
		}
		ids = append(ids, int64(id))
	}
	user, err := service.DeleteUsers(ids)
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	RespSuccess(ctx, user)
}
