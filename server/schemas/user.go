package schemas

type CreateUserReq struct {
	Name     string `json:"name,omitempty" binding:"required"`
	Password string `json:"password,omitempty" binding:"required"`
	Gender   Gender `json:"gender,omitempty" binding:"required"`
	Phone    string `json:"phone,omitempty" binding:"required"`
	Address  string `json:"address,omitempty" binding:"required"`
	RoleID   int64  `json:"role_id,omitempty" binding:"required"`
}

type UpdateUserReq = CreateUserReq
