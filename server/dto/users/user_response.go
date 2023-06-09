package usersdto

type UserResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname" form:"fullname"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password"`
	Phone     string `json:"phone" form:"phone"`
	Address   string `json:"address" form:"address"`
	ListAs    string `json:"listAs" form:"listAs"`
	Subscribe string `json:"subscribe" form:"subscribe"`
}

type UserResponseDel struct {
	ID int `json:"id"`
}
