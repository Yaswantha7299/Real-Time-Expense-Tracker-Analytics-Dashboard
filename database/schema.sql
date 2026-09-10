-- ============================================================
-- Expense Tracker Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS expense_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE expense_tracker;

CREATE TABLE IF NOT EXISTS expenses (
  id              INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  title           VARCHAR(150)      NOT NULL,
  amount          DECIMAL(10, 2)    NOT NULL CHECK (amount > 0),
  category        ENUM(
                    'Food',
                    'Transport',
                    'Shopping',
                    'Bills',
                    'Entertainment',
                    'Education',
                    'Healthcare',
                    'Travel',
                    'Other'
                  )                 NOT NULL,
  expense_date    DATE              NOT NULL,
  payment_method  ENUM(
                    'Cash',
                    'Credit Card',
                    'Debit Card',
                    'UPI',
                    'Net Banking',
                    'Other'
                  )                 NOT NULL DEFAULT 'Cash',
  description     TEXT              NULL,
  created_at      TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  INDEX idx_category     (category),
  INDEX idx_expense_date (expense_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
