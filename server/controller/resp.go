package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Code int64

// TODO(nsx): 改为与 http 状态码一致
// - 200 OK           返回正常
// - 302 Found        重定向，让浏览器跳转到其它地址
// - 304 Not Modified 服务端资源无变化，可使用缓存资源
// - 400 Bad Request  请求参数不合法
// - 401 Unauthorized 请求需要用户的身份认证，未授权
// - 403 Forbidden    服务端禁止访问该资源
// - 404 Not Found    服务端未找到该资源
// - 408 Request Time-out       服务器等待客户端发送的请求时间过长，超时
// - 415 Unsupported Media Type 服务器无法处理请求附带的媒体格式
// - 500 Internal Server Error  服务端异常
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
