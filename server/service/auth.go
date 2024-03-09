package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func PhoneLogin(req *schemas.LoginReq) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, "phone = ?", req.Phone); res.RowsAffected == 0 {
		return nil, fmt.Errorf("user not found")
	}
	if req.Password != user.Password {
		return nil, fmt.Errorf("wrong password")
	}
	return changeLoginStatus(user.ID, 2)
}

func Login(id int64) (*schemas.User, error) {
	return changeLoginStatus(id, 2)
}

func Layout(id int64) (*schemas.User, error) {
	return changeLoginStatus(id, 1)
}

func changeLoginStatus(id, status int64) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, id); res.RowsAffected == 0 {
		return nil, fmt.Errorf("user not found")
	}
	user.IsLogin = int(status)
	if err := global.DB.Save(&user).Error; err != nil {
		return nil, fmt.Errorf("db: user %s login status update error", user.Name)
	}
	return &user, nil
}
