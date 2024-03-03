package service

import (
	"fmt"
	"server/global"
	"server/schemas"
	"time"
)

func GetNotices() ([]schemas.Notice, error) {
	var notices []schemas.Notice
	if err := global.DB.Find(&notices).Error; err != nil {
		return nil, err
	}
	return notices, nil
}

func GetNoticesByTime(start, end int64) ([]schemas.Notice, error) {
	fmt.Printf("start: %v\n", start)
	fmt.Printf("end: %v\n", end)
	// 将时间戳转换为 time.Time 类型
	startTime := time.Unix(start, 0)
	endTime := time.Unix(end, 0)
	var notices []schemas.Notice
	if err := global.DB.Find(&notices, "ctime > ? AND mtime < ?", startTime, endTime).Error; err != nil {
		return nil, err
	}
	return notices, nil
}

func CreateNotice(req *schemas.CreateNoticeReq) (*schemas.Notice, error) {
	var notice schemas.Notice
	notice.Message = req.Message
	if err := global.DB.Create(&notice).Error; err != nil {
		return nil, err
	}
	return &notice, nil
}

func DeleteNotice(id int64) (*schemas.Notice, error) {
	var notice schemas.Notice
	if err := global.DB.First(&notice, id).Error; err != nil {
		return nil, fmt.Errorf("notice no found")
	}
	if err := global.DB.Delete(&notice, id).Error; err != nil {
		return nil, err
	}
	return &notice, nil
}
