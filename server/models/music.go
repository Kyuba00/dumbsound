package models

type Music struct {
	ID        int            `json:"id" form:"id" gorm:"auto_increment:primary_key"`
	Title     string         `json:"title" form:"title" gorm:"type: varchar(255)"`
	Year      string         `json:"year" form:"year" gorm:"type: varchar(255)"`
	Thumbnail string         `json:"thumbnail" form:"thumbnail" gorm:"type: varchar(255)"`
	Song      string         `json:"song" form:"song" gorm:"type: varchar(255)"`
	ArtistID  int            `json:"artist_id" form:"artist_id" gorm:"type: int"`
	Artist    ArtistResponse `json:"-"`
}

type MusicResponse struct {
	ID        int            `json:"id"`
	Title     string         `json:"title)"`
	Year      string         `json:"year"`
	Thumbnail string         `json:"thumbnail"`
	Song      string         `json:"song"`
	ArtistID  int            `json:"artist_id"`
	Artist    ArtistResponse `json:"-"`
}

func (MusicResponse) TableName() string {
	return "musics"
}
