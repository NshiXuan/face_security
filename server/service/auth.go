package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func Login(req *schemas.LoginReq) (*schemas.User, error) {
	var user schemas.User
	if res := global.DB.First(&user, "phone = ?", req.Phone); res.RowsAffected == 0 {
		return nil, fmt.Errorf("user not found")
	}
	if req.Password != user.Password {
		return nil, fmt.Errorf("wrong password")
	}
	return &user, nil
}
