package router

import (
	"net/http"
	"server/controller"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Cors())
	r := router.Group("api").Group("v1")
	r.POST("/face/create", controller.CreateFace)
	r.POST("/face", controller.FindFace)
	r.GET("/faces", controller.GetFaceList)
	r.GET("/face", controller.GetFaceByName)
	r.DELETE("/face/:id", controller.RemoveFace)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"code": http.StatusNotFound,
			"msg":  "404 Not Found",
		})
	})
	return router
}
