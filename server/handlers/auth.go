package handlers

import (
	"fmt"
	"log"
	"net/http"
	authdto "server/dto/auth"
	dto "server/dto/result"
	"server/models"
	"server/pkg/bcrypt"
	jwtToken "server/pkg/jwt"
	"server/repositories"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.RegisterRequest)

	if err := c.Bind(request); err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		return c.JSON(http.StatusInternalServerError, response)
	}

	user := models.User{
		Fullname: request.Fullname,
		Email:    request.Email,
		Password: password,
		Gender:   request.Gender,
		Phone:    request.Phone,
		Address:  request.Address,
		ListAs:   request.ListAs,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	return c.JSON(http.StatusOK, response)
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "wrong email or password"}
		return c.JSON(http.StatusBadRequest, response)
	}

	//generate token
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["listAs"] = user.ListAs
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return errGenerateToken
	}

	loginResponse := authdto.LoginResponse{
		Email:  user.Email,
		Token:  token,
		ListAs: user.ListAs,
	}

	response := dto.SuccessResult{Code: http.StatusOK, Data: loginResponse}
	return c.JSON(http.StatusOK, response)

}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userInfo := c.Get("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	user, err := h.AuthRepository.Getuser(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	checkAuthResponse := authdto.CheckAuthResponse{
		ID:        user.ID,
		Fullname: user.Fullname,
		Email:     user.Email,
		ListAs:    user.ListAs,
		Subscribe: user.Subscribe,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: checkAuthResponse})
}
