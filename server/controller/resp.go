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
	CodeOK                  Code = 200
	CodeFound               Code = 302
	CodeBadRequest          Code = 400
	CodeUnauthorized        Code = 401
	CodeForbidden           Code = 403
	CodeNotFound            Code = 404
	CodeRequestTimeOut      Code = 408
	CodeInternalServerError Code = 500
)

var codeMsg = map[Code]string{
	CodeOK:                  "OK",
	CodeFound:               "Found",
	CodeBadRequest:          "Bad Request",
	CodeUnauthorized:        "Unauthorized",
	CodeForbidden:           "Forbidden",
	CodeNotFound:            "Not Found ",
	CodeRequestTimeOut:      "Request Time-out",
	CodeInternalServerError: "Internal Server Error",
}

func (c Code) Msg() string {
	msg, ok := codeMsg[c]
	if !ok {
		msg = codeMsg[CodeInternalServerError]
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
		Code: CodeOK,
		Msg:  CodeOK.Msg(),
		Data: data,
	})
}

func RespSuccessWithMsg(c *gin.Context, msg string, data any) {
	c.JSON(http.StatusOK, &Resp{
		Code: CodeOK,
		Msg:  msg,
		Data: data,
	})
}
