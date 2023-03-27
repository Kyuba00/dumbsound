package models

type User struct {
	ID        int    `json:"id" form:"id" gorm:"PRIMARY_KEY:AUTO_INCREMENT"`
	Fullname  string `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Email     string `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password  string `json:"password" form:"password" gorm:"type: varchar(255)"`
	ListAs    string `json:"listAs" form:"listAs" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Address   string `json:"address" form:"address" gorm:"type: varchar(255)"`
	// Image     string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Subscribe string `json:"subscribe" form:"subscribe" gorm:"type: varchar(255)"`
}

type UserResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	ListAs    string `json:"listAs"`
	Gender    string `json:"gender"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
	// Image     string `json:"image"`
	Subscribe string `json:"subscribe"`
}

func (UserResponse) TableName() string {
	return "users"
}
