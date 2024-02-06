package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Code int64

const (
	CodeSuccess Code = 1000 + iota
	CodeInvalidParam
	CodeUserExist
	CodeUserNotExist
	CodeInvalidPassword
	CodeServerBusy

	CodeInvalidToken
	CodeNeedLogin
)

var codeMsg = map[Code]string{
	CodeSuccess:         "success",
	CodeInvalidParam:    "请求参数错误",
	CodeUserExist:       "用户已存在",
	CodeUserNotExist:    "用户名不存在",
	CodeInvalidPassword: "用户名或密码错误",
	CodeServerBusy:      "服务繁忙",

	CodeInvalidToken: "无效的token",
	CodeNeedLogin:    "需要登录",
}

func (c Code) Msg() string {
	msg, ok := codeMsg[c]
	if !ok {
		msg = codeMsg[CodeServerBusy]
	}
	return msg
}

type Resp struct {
	Code Code `json:"code"`
	Msg  any  `json:"msg"`
	Data any  `json:"data,omitempty"`
}

func RespError(c *gin.Context, code Code) {
	c.JSON(http.StatusOK, &Resp{
		Code: code,
		Msg:  code.Msg(),
		Data: nil,
	})
}

func RespErrorWithMsg(c *gin.Context, code Code, msg any) {
	c.JSON(http.StatusOK, &Resp{
		Code: code,
		Msg:  msg,
		Data: nil,
	})
}

func RespSuccess(c *gin.Context, data any) {
	c.JSON(http.StatusOK, &Resp{
		Code: CodeSuccess,
		Msg:  CodeSuccess.Msg(),
		Data: data,
	})
}

func RespSuccessWithMsg(c *gin.Context, msg string, data any) {
	c.JSON(http.StatusOK, &Resp{
		Code: CodeSuccess,
		Msg:  msg,
		Data: data,
	})
}
