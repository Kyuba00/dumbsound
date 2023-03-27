package middleware

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	dto "server/dto/result"

	"github.com/labstack/echo/v4"
)

func UploadMusic(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Upload file
		// FormFile returns the first file for the given key myFile
		// it also returns the FileHeader so we can get the Filename,
		// the Header and the size of the file
		file, _, err := c.Request().FormFile("song")

		if err != nil && c.Request().Method == "PATCH" {
			ctx := context.WithValue(c.Request().Context(), "dataMusic", "false")
			c.SetRequest(c.Request().WithContext(ctx))
			return next(c)
		}

		if err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, "Gagal Upload File Music")
		}
		defer file.Close()

		const MAX_UPLOAD_SIZE = 40 << 20 // 10MB

		c.Request().ParseMultipartForm(MAX_UPLOAD_SIZE)
		if c.Request().ContentLength > MAX_UPLOAD_SIZE {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Max size in 1mb"})
		}

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := ioutil.TempFile("dumbsound/song", "music-*.mp3")
		if err != nil {
			fmt.Println(err)
			fmt.Println("path upload error")
			return c.JSON(http.StatusInternalServerError, err)
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			fmt.Println(err)
		}

		// write this byte array to our temporary file
		tempFile.Write(fileBytes)

		data := tempFile.Name()
		// filename := data[13:]

		ctx := context.WithValue(c.Request().Context(), "dataMusic", data)
		c.SetRequest(c.Request().WithContext(ctx))
		return next(c)
	}
}
