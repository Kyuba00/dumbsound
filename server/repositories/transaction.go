package repositories

import (
	"server/models"
	"time"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransactionNew(status string, ID string) error
	UpdateTransactionStatusUser(status string, ID string) error
	UpdateTransactionDueDate(status time.Time, ID string) error
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransactionByID(userId int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User.Role").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User.Role").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User.Role").Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User.Role").Save(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User.Role").Delete(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransactionByID(userId int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Where("user_id=?", userId).Preload("User.Role").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User.Role").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) UpdateTransactionNew(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	transaction.StatusPayment = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) UpdateTransactionStatusUser(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	transaction.StatusUser = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) UpdateTransactionDueDate(timeFailed time.Time, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	transaction.DueDate = timeFailed

	err := r.db.Save(&transaction).Error

	return err
}
