package authdto

type LoginResponse struct {
	Email    string `json:"email" form:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" form:"password" gorm:"type: varchar(255)" validate:"required"`
	ListAs   string `json:"listAs" form:"listAs" gorm:"type: varchar(255)" validate:"required"`
	Token    string `json:"token" gorm:"type:varchar(255)"`
}

type RegisterResponse struct {
	Email string `json:"email" gorm:"type: varchar(255)"`
	Token string `json:"token" gorm:"type: varchar(255)"`
}

type CheckAuthResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	Email     string `json:"email"`
	ListAs    string `json:"listAs"`
	Subscribe string `json:"subscribe"`
}
