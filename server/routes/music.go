package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func MusicRoutes(e *echo.Group) {
	musicRepository := repositories.RepositoryMusic(mysql.DB)
	h := handlers.HandleMusic(musicRepository)

	e.GET("/musics", h.FindMusics)
	e.GET("/music/:id", h.GetMusic)
	e.POST("/music", h.CreateMusic, middleware.Auth, middleware.UploadFile, middleware.UploadMusic)
}
