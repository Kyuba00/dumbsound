package usersdto

type CreateUserRequest struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Address  string `json:"address" form:"address" validate:"required"`
	ListAs   string `json:"listAs" form:"listAs"`
}
type UpdateUserRequest struct {
	Fullname  string `json:"fullname" form:"fullname"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password"`
	Gender    string `json:"gender" form:"gender"`
	Phone     string `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	ListAs    string `json:"listAs" form:"listAs"`
	Subscribe string `json:"subscribe" form:"subscribe"`
}

type LoginRequest struct {
	Email    string ` json:"email" validate:"required"`
	Password string ` json:"password" validate:"required"`
}
