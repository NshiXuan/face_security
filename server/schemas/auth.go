package schemas

type LoginReq struct {
	Phone    string `json:"phone,omitempty" binding:"required"`
	Password string `json:"password,omitempty" binding:"required"`
}

type LoginResp struct {
	UserId int64  `json:"user_id,omitempty"`
	Token  string `json:"token,omitempty"`
}
