package models

import "time"

type Transaction struct {
	ID            int          `json:"id" form:"id" gorm:"auto_increment:primary_key"`
	StartDate     time.Time    `json:"start_date" from:"start_date"`
	DueDate       time.Time    `json:"due_date" form:"due_date"`
	StatusUser    string       `json:"status_user" form:"status_user" gorm:"type: varchar(255)"`
	StatusPayment string       `json:"status_payment" form:"status_payment" gorm:"type: varchar(255)"`
	UserID        int          `json:"user_id" form:"user_id" gorm:"type: int"`
	User          UserResponse `json:"user"`
	CreatedAt     time.Time    `json:"-"`
	UpdatedAt     time.Time    `json:"-"`
}

func (Transaction) TableName() string {
	return "transactions"
}
