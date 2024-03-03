package schemas

import "time"

type CreateNoticeReq struct {
	Message string `json:"message,omitempty" binding:"required"`
}

type GetNoticesReq struct {
	Start *time.Time `json:"start,omitempty" binding:"required"`
	End   *time.Time `json:"end,omitempty" binding:"required"`
}
