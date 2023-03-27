package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", h.CreateTransaction, middleware.Auth)
	e.PATCH("/transaction/:id", h.UpdateTransaction, middleware.Auth)
	e.DELETE("/transaction/:id", h.DeleteTransaction, middleware.Auth)
	e.POST("/notification", h.Notification)
	e.GET("/transactionId", h.FindTransactionByID, middleware.Auth)
}
