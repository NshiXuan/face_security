package controller

import (
	"log"
	"net/http"
	"server/schemas"
	"server/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetNotices(ctx *gin.Context) {
	notices, err := service.GetNotices()
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	RespSuccess(ctx, notices)
}

func GetNoticesByTime(ctx *gin.Context) {
	start, err := strconv.Atoi(ctx.Query("start"))
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	end, err := strconv.Atoi(ctx.Query("end"))
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	notices, err := service.GetNoticesByTime(int64(start), int64(end))
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	RespSuccess(ctx, notices)
}

func CreateNotice(ctx *gin.Context) {
	var req schemas.CreateNoticeReq
	if err := ctx.BindJSON(&req); err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusBadRequest, err)
		return
	}
	notice, err := service.CreateNotice(&req)
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	RespSuccess(ctx, notice)
}

func DeleteNotice(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		RespErrorWithMsg(ctx, http.StatusBadRequest, err)
		return
	}
	notice, err := service.DeleteNotice(int64(id))
	if err != nil {
		log.Println(err)
		RespErrorWithMsg(ctx, http.StatusInternalServerError, err)
		return
	}
	RespSuccess(ctx, notice)
}
