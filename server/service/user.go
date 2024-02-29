package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func CreateUser(req *schemas.CreateUserReq) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, "phone = ?", req.Phone); res.RowsAffected == 1 {
		return nil, fmt.Errorf("user already exists")
	}
	user.Name = req.Name
	user.Password = req.Password
	user.Gender = req.Gender
	user.Phone = req.Phone
	user.Address = req.Address
	user.RoleID = req.RoleID
	// Note(nsx): user 使用了 belong to 外键关联，Create 需要 role_id 已经存在
	// TODO(nsx): Preload 与 Create 一起使用 Preload 不生效
	if err := global.DB.Preload("Role").Create(&user).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &user, nil
}

func GetUsers() ([]schemas.User, error) {
	var users []schemas.User
	if err := global.DB.Find(&users).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return users, nil
}

func GetUserByName(name string) ([]schemas.User, error) {
	var users []schemas.User
	if err := global.DB.Where("name like ?", fmt.Sprintf("%s%%", name)).Preload("Role").Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func GetUserById(id int64) (*schemas.User, error) {
	var user schemas.User
	if err := global.DB.Preload("Role").Find(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UpdateUser(id int64, req *schemas.CreateUserReq) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, id); res.RowsAffected == 0 {
		return nil, fmt.Errorf("user no found")
	}
	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Password != "" {
		user.Password = req.Password
	}
	if req.Gender != 0 {
		user.Gender = req.Gender
	}
	if req.Phone != "" {
		user.Phone = req.Phone
	}
	if req.Address != "" {
		user.Address = req.Address
	}
	if req.RoleID != 0 {
		user.RoleID = req.RoleID
	}
	if err := global.DB.Save(&user).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &user, nil
}

func DeleteUser(id int64) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, id); res.RowsAffected == 0 {
		return nil, fmt.Errorf("user not found")
	}
	if err := global.DB.Delete(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
