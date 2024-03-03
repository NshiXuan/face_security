package schemas

type LoginReq struct {
	Phone    string `json:"phone,omitempty" binding:"required"`
	Password string `json:"password,omitempty" binding:"required"`
}

type LoginResp struct {
	UserId int64  `json:"user_id,omitempty"`
	RoleId int64  `json:"role_id,omitempty"`
	Token  string `json:"token,omitempty"`
}

type CheckRoleReq struct {
	Token string `json:"token,omitempty" binding:"required"`
}

type CheckRoleResp struct {
	UserName string `json:"user_name,omitempty"`
	RoleId   int64  `json:"role_id,omitempty"`
}
