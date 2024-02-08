package router

import (
	"net/http"
	"server/controller"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())
	apiRouter := r.Group("api").Group("v1")
	faceRouter := apiRouter.Group("face")
	faceRouter.POST("/create", controller.CreateFace)
	faceRouter.POST("", controller.FindFace)
	faceRouter.GET("", controller.GetFaceList)

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"code": http.StatusNotFound,
			"msg":  "404 Not Found",
		})
	})
	return r
}
