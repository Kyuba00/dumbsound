package artistdto

type ArtistRequest struct {
	Name        string `form:"name"  validate:"required"`
	Age         string `form:"age"  validate:"required"`
	Type        string `form:"type" validate:"required"`
	StartCareer string `form:"startcareer" validate:"required"`
}
