package artistdto

type ArtistResponse struct {
	ID          int    `form:"id"`
	Name        string `form:"name"`
	Age         string `form:"age"`
	Type        string `form:"type"`
	StartCareer string `form:"startcareer"`
}
