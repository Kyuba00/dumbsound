package authdto

type RegisterRequest struct {
	Fullname string `json:"fullname" form:"fullname" gorm:"type: varchar(255)" validate:"required"`
	Email    string `json:"email" form:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" form:"password" gorm:"type: varchar(255)" validate:"required"`
	ListAs   string `json:"listAs" form:"listAs" gorm:"type: varchar(255)"`
	Gender   string `json:"gender" form:"gender" gorm:"type: varchar(255)" validate:"required"`
	Phone    string `json:"phone" form:"phone" gorm:"type: varchar(255)" validate:"required"`
	Address  string `json:"address" form:"address" gorm:"type: varchar(255)" validate:"required"`
	// Image    string `json:"image" form:"image" gorm:"type: varchar(255)" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" form:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" form:"password" gorm:"type: varchar(255)" validate:"required"`
}
