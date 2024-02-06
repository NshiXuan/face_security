package main

import (
	"encoding/json"
	"fmt"
	"os"
	"server/global"
	"server/models"
	"server/router"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// TODO(nsx): 抽离出来到单独的模块？
func initMysql() error {
	b, err := os.ReadFile("config.json")
	if err != nil {
		return err
	}
	if err := json.Unmarshal(b, &global.Config); err != nil {
		return err
	}

	conf := global.Config.Mysql
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", conf.User, conf.Password, conf.Host, conf.Port, conf.Database)
	mysqlLog := logger.Default.LogMode(logger.Info)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: mysqlLog,
	})
	if err != nil {
		return err
	}

	global.DB = db
	return nil
}

func main() {
	if err := initMysql(); err != nil {
		panic(err)
	}

	// 加载 Model
	models.NewRecognise()

	r := router.InitRouter()

	// TODO(nsx): init log

	if err := r.Run(fmt.Sprintf(":%d", global.Config.Server.Port)); err != nil {
		panic(err)
	}

	// TODO(nsx): 优雅退出？
}
