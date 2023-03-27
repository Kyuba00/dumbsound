package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	musicdto "server/dto/musics"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/labstack/echo/v4"
)

type handlerMusic struct {
	MusicRepository repositories.MusicRepository
}

func HandleMusic(MusicRepository repositories.MusicRepository) *handlerMusic {
	return &handlerMusic{MusicRepository}
}

func (h *handlerMusic) FindMusics(c echo.Context) error {
	thumbnail, err := h.MusicRepository.FindMusics()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	for i, p := range thumbnail {
		thumbnail[i].Thumbnail = p.Thumbnail
		thumbnail[i].Song = p.Song
	}

	response := dto.SuccessResult{Code: http.StatusOK, Data: thumbnail}
	return c.JSON(http.StatusOK, response)
}

func (h *handlerMusic) GetMusic(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	thumbnail, err := h.MusicRepository.GetMusic(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: thumbnail})
}

func (h *handlerMusic) CreateMusic(c echo.Context) error {
	dataContex := c.Get("dataFile")
	dataMusicContext := c.Get("dataMusic")
	filepath := dataContex.(string)
	musicFile := dataMusicContext.(string)

	ctx := context.Background()
	CLOUD_NAME := os.Getenv("CLOUD_NAME")
	API_KEY := os.Getenv("API_KEY")
	API_SECRET := os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
	resImg, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "dumbsound/thumbnail"})
	if err != nil {
		fmt.Println("gagal Upload Image", err.Error())
	}

	resMusic, err := cld.Upload.Upload(ctx, musicFile, uploader.UploadParams{Folder: "dumbsound/song"})
	if err != nil {
		fmt.Println("gagal Upload Music", err.Error())
	}

	artisID, _ := strconv.Atoi(c.FormValue("artist_id"))
	request := musicdto.MusicRequest{
		Title:     c.FormValue("title"),
		Year:      c.FormValue("year"),
		ArtistID:  artisID,
		Thumbnail: resImg.SecureURL,
		Song:      resMusic.SecureURL,
	}

	if err := c.Validate(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	music := models.Music{
		Title:     request.Title,
		Year:      request.Year,
		Thumbnail: request.Thumbnail,
		Song:      request.Song,
		ArtistID:  request.ArtistID,
	}

	data, err := h.MusicRepository.CreateMusic(music)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	data2, err := h.MusicRepository.GetMusic(data.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data2})
}
