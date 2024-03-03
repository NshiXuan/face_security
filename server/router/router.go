package router

import (
	"net/http"
	"server/controller"
	"server/middlewares"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middlewares.Cors())

	r := router.Group("api").Group("v1")
	r.POST("/face", controller.CreateFace)
	r.POST("/face/find", controller.FindFace)
	r.GET("/face", controller.GetFaceByName)
	r.GET("/faces", controller.GetFaces)
	r.PUT("/face/:id", controller.UpdateFace)
	r.DELETE("/face/:id", controller.RemoveFace)

	r.POST("/role", controller.CreateRole)
	r.GET("/roles", controller.GetRoles)
	r.PUT("/role/:id", controller.UpdateRole)
	r.DELETE("/role/:id", controller.DeleteRole)

	r.POST("/user", controller.CreateUser)
	r.GET("/users", controller.GetUsers)
	r.GET("/user", controller.GetUserByName)
	r.GET("/user/:id", controller.GetUserById)
	r.PUT("/user/:id", controller.UpdateUser)
	r.DELETE("/user/:id", controller.DeleteUser)

	r.POST("/auth/login", controller.Login)
	r.POST("/auth/face", controller.FaceLogin)
	// r.POST("/auth/check", controller.CheckRole)

	r.POST("/notice", controller.CreateNotice)
	r.GET("/notices", controller.GetNotices)
	r.GET("/notice", controller.GetNoticesByTime)
	r.DELETE("/notice/:id", controller.DeleteNotice)

	r.GET("/ws", controller.HandleWebSocket)
	go controller.HandleMessages()

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"code": http.StatusNotFound,
			"msg":  "404 Not Found",
		})
	})
	return router
}
