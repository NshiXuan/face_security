package schemas

import "mime/multipart"

type FaceCreateReq struct {
	Name string                `form:"name" binding:"required"`
	File *multipart.FileHeader `form:"file" binding:"required"`
}

type FaceFindReq struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
}

type FindFaceResp struct {
	ID   int64  `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}
