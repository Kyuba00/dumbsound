package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type MusicRepository interface {
	FindMusics() ([]models.Music, error)
	GetMusic(ID int) (models.Music, error)
	CreateMusic(trip models.Music) (models.Music, error)
}

func RepositoryMusic(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindMusics() ([]models.Music, error) {
	var Music []models.Music
	err := r.db.Preload("Artist").Find(&Music).Error

	return Music, err
}

func (r *repository) GetMusic(ID int) (models.Music, error) {
	var Music models.Music
	err := r.db.Preload("Artist").First(&Music, ID).Error

	return Music, err
}

func (r *repository) CreateMusic(music models.Music) (models.Music, error) {
	err := r.db.Create(&music).Error

	return music, err
}
