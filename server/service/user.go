package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func CreateUser(req *schemas.CreateUserReq) (*schemas.User, error) {
	var user schemas.User
	user.Name = req.Name
	user.Password = req.Password
	user.Gender = req.Gender
	user.Phone = req.Phone
	user.Address = req.Address
	user.RoleID = req.RoleID
	// Note(nsx): user 使用了 belong to 外键关联，Create 需要 role_id 已经存在
	// TODO(nsx): Preload 没有生效
	if err := global.DB.Preload("Role").Create(&user).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &user, nil
}

func GetUserByName(name string) ([]schemas.User, error) {
	var users []schemas.User
	if err := global.DB.Where("name like ?", fmt.Sprintf("%s%%", name)).Preload("Role").Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}
