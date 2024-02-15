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
	r.PUT("/user/:id", controller.UpdateUser)
	r.DELETE("/user/:id", controller.DeleteUser)

	r.POST("/auth/login", controller.Login)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"code": http.StatusNotFound,
			"msg":  "404 Not Found",
		})
	})
	return router
}
