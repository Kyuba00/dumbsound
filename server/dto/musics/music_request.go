package musicdto

type MusicRequest struct {
	Title     string `form:"title" validate:"required"`
	Year      string `form:"year" validate:"required"`
	Thumbnail string `form:"thumbnail"  validate:"required"`
	Song      string `form:"song" validate:"required"`
	ArtistID  int    `form:"artist_id"  validate:"required"`
}
