package controller

import (
	"log"
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
	RespSuccess(ctx, schemas.LoginResp{
		UserId: user.ID,
		RoleId: user.RoleID,
		Token:  token,
	})
}

func FaceLogin(ctx *gin.Context) {
	var req schemas.FindFaceReq
	if err := ctx.ShouldBind(&req); err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeBadRequest, err.Error())
		return
	}
	face, err := service.FindFace(&req)
	if err != nil {
		zap.S().Error(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}
	users, err := service.GetUserByName(face.Name)
	if err != nil {
		log.Panicln(err)
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
		return
	}

	j := middlewares.NewJWT()
	token, err := j.CreateToken(middlewares.CustomClaims{
		ID:       uint(users[0].ID),
		UserName: users[0].Name,
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix(),               // 签名失效时间
			ExpiresAt: time.Now().Unix() + 60*60*24*30, // 30天过期
			Issuer:    "codersx",                       // 签发机构
		},
	})
	if err != nil {
		RespErrorWithMsg(ctx, CodeInternalServerError, err.Error())
	}
	// TODO(nsx): 这里的 userid 有问题，它为 face id
	RespSuccess(ctx, schemas.LoginResp{
		UserId: users[0].ID,
		RoleId: users[0].RoleID,
		Token:  token,
	})
}

// func CheckRole(ctx *gin.Context) {
// 	var req schemas.CheckRoleReq
// 	if err := ctx.BindJSON(&req); err != nil {
// 		log.Println(err)
// 		RespErrorWithMsg(ctx, http.StatusBadRequest, err)
// 		return
// 	}
// 	j := middlewares.NewJWT()
// 	claims, err := j.ParseToken(req.Token)
// 	if err != nil {
// 		log.Println(err)
// 		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
// 		return
// 	}
// 	users, err := service.GetUserByName(claims.UserName)
// 	if err != nil {
// 		log.Println(err)
// 		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
// 		return
// 	}
// 	RespSuccess(ctx, schemas.CheckRoleResp{
// 		UserName: users[0].Name,
// 		RoleId:   users[0].RoleID,
// 	})
// }
