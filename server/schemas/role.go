package schemas

type CreateRoleReq struct {
	Name string `json:"name,omitempty" binding:"required"`
	Desc string `json:"desc,omitempty"`
}
