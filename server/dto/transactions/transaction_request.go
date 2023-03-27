package transactiondto

import (
	"server/models"
	"time"
)

type CreateTransactionRequest struct {
	UserID        int         `json:"userid"`
	User          models.User `json:"user"`
	StartDate     time.Time   `json:"start_date"`
	DueDate       time.Time   `json:"due_date"`
	StatusUser    string      `json:"status_user" gorm:"type: varchar(255)"`
	StatusPayment string      `json:"status_payment" gorm:"type: varchar(255)"`
	CreatedAt     time.Time   `json:"created_at"`
	UpdatedAt     time.Time   `json:"updated_at"`
}

type UpdateTransactionRequest struct {
	StatusUser    string    `json:"status_user" gorm:"type: varchar(255)"`
	StatusPayment string    `json:"status_payment" gorm:"type: varchar(255)"`
	DueDate       time.Time `json:"due_date"`
}
