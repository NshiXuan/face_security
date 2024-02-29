package controller

import (
	"server/middlewares"
	"server/schemas"
	"server/service"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Login(ctx *gin.Context) {
	var req schemas.LoginReq
	if err := ctx.BindJSON(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	user, err := service.Login(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
	}
	j := middlewares.NewJWT()
	token, err := j.CreateToken(middlewares.CustomClaims{
		ID:       uint(user.ID),
		UserName: user.Name,
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix(),               // 签名失效时间
			ExpiresAt: time.Now().Unix() + 60*60*24*30, // 30天过期
			Issuer:    "codersx",                       // 签发机构
		},
	})
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
	}
	RespSuccess(ctx, map[string]string{"token": token})
}

func FaceLogin(ctx *gin.Context) {
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
