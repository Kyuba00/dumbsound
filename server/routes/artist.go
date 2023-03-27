package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func ArtistRoutes(e *echo.Group) {
	artistRepository := repositories.RepositoryArtist(mysql.DB)
	h := handlers.HandleArtist(artistRepository)

	e.GET("/artists", h.FindArtists)
	e.POST("/artists", h.CreateArtist, middleware.Auth)
	e.GET("/artists/:id", h.GetArtist, middleware.Auth)
}
