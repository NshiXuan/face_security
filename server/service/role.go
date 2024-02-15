package service

import (
	"fmt"
	"server/global"
	"server/schemas"
)

func CreateRole(req *schemas.CreateRoleReq) (*schemas.Role, error) {
	var role schemas.Role
	if res := global.DB.First(&role, "name = ?", req.Name); res.RowsAffected == 1 {
		return nil, fmt.Errorf("role already exists")
	}
	role.Name = req.Name
	if req.Desc != "" {
		role.Desc = req.Desc
	}
	if err := global.DB.Create(&role).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &role, nil
}

func GetRoles() ([]schemas.Role, error) {
	var roles []schemas.Role
	if err := global.DB.Find(&roles).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return roles, nil
}

func UpdateRole(id int64, req *schemas.UpdateRoleReq) (*schemas.Role, error) {
	var role schemas.Role
	if err := global.DB.First(&role, id).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	if req.Name != "" {
		role.Name = req.Name
	}
	if req.Desc != "" {
		role.Desc = req.Desc
	}
	if err := global.DB.Save(&role).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &role, nil
}

func DeleleRole(id int64) (*schemas.Role, error) {
	var role schemas.Role
	if res := global.DB.First(&role, id); res.RowsAffected == 0 {
		return nil, fmt.Errorf("role not found")
	}
	if err := global.DB.Delete(&role, id).Error; err != nil {
		return nil, fmt.Errorf("db err: %w", err)
	}
	return &role, nil
}
