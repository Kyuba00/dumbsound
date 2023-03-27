package handlers

import (
	"net/http"
	artistdto "server/dto/artists"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handleArtist struct {
	ArtistRepository repositories.ArtistRepository
}

func HandleArtist(ArtistRepository repositories.ArtistRepository) *handleArtist {
	return &handleArtist{ArtistRepository}
}

func (h *handleArtist) FindArtists(c echo.Context) error {
	artist, err := h.ArtistRepository.FindArtists()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: artist})
}

func (h *handleArtist) GetArtist(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid ID"})
	}

	artist, err := h.ArtistRepository.GetArtist(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: artist})
}

func (h *handleArtist) CreateArtist(c echo.Context) error {
	request := artistdto.ArtistRequest{
		Name:        c.FormValue("name"),
		Age:         c.FormValue("age"),
		Type:        c.FormValue("type"),
		StartCareer: c.FormValue("startcareer"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	artist := models.Artist{
		Name:        request.Name,
		Age:         request.Age,
		Type:        request.Type,
		StartCareer: request.StartCareer,
	}

	dataArtist, err := h.ArtistRepository.CreateArtist(artist)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	getArtist, err := h.ArtistRepository.GetArtist(dataArtist.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseArtist(getArtist)})
}

func convertResponseArtist(u models.Artist) artistdto.ArtistResponse {
	return artistdto.ArtistResponse{
		ID:          u.ID,
		Name:        u.Name,
		Age:         u.Age,
		Type:        u.Type,
		StartCareer: u.StartCareer,
	}
}
