package schemas

type LoginReq struct {
	Phone    string `json:"phone,omitempty" binding:"required"`
	Password string `json:"password,omitempty" binding:"required"`
}
