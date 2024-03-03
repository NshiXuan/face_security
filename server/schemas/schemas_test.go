package schemas

import (
	"testing"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func TestSchemas(t *testing.T) {
	t.Run("init mysql table", func(t *testing.T) {
		dsn := "root:@Codersx123@tcp(172.17.0.1:3306)/face_security?charset=utf8mb4&parseTime=True&loc=Local"
		mysqlLog := logger.Default.LogMode(logger.Info)
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
			Logger: mysqlLog,
		})
		if err != nil {
			panic(err)
		}

		db.AutoMigrate(&User{}, &Role{}, &Face{}, &Notice{})
	})
}
