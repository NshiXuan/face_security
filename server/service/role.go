package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func CreateRole(req *schemas.CreateRoleReq) (*schemas.Role, error) {
	var role schemas.Role
	role.Name = req.Name
	if req.Desc != "" {
		role.Desc = req.Desc
	}
	if err := global.DB.Create(&role).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &role, nil
}
