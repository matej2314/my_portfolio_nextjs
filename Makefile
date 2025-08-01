# Makefile for my_portfolio_nextjs project
# Author: Mateusz Śliwowski

# Helper commands
.PHONY: help install dev build start prod lint clean docker-build docker-run docker-stop docker-clean db-generate db-migrate db-reset db-seed test format check-deps setup deploy full-clean

# Default command - displays help
help:
	@echo "$(GREEN)=== Makefile for $(PROJECT_NAME) ===$(NC)"
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo "  $(GREEN)install$(NC)      - Install dependencies"
	@echo "  $(GREEN)dev$(NC)          - Start development server"
	@echo "  $(GREEN)build$(NC)        - Build application"
	@echo "  $(GREEN)start$(NC)        - Start production application"
	@echo "  $(GREEN)prod$(NC)         - Start on port $(PROD_PORT)"
	@echo "  $(GREEN)lint$(NC)         - Check code with ESLint"
	@echo "  $(GREEN)clean$(NC)        - Clean temporary files"
	@echo "  $(GREEN)format$(NC)       - Format code"
	@echo ""
	@echo "$(YELLOW)Database:$(NC)"
	@echo "  $(GREEN)db-generate$(NC)  - Generate Prisma client"
	@echo "  $(GREEN)db-migrate$(NC)   - Run database migrations"
	@echo "  $(GREEN)db-reset$(NC)     - Reset database"
	@echo "  $(GREEN)db-seed$(NC)      - Seed database"
	@echo ""
	@echo "$(YELLOW)Docker:$(NC)"
	@echo "  $(GREEN)docker-build$(NC) - Build Docker image"
	@echo "  $(GREEN)docker-run$(NC)   - Start container"
	@echo "  $(GREEN)docker-stop$(NC)  - Stop container"
	@echo "  $(GREEN)docker-clean$(NC) - Remove image and container"
	@echo ""
	@echo "$(YELLOW)Tools:$(NC)"
	@echo "  $(GREEN)check-deps$(NC)   - Check dependencies"
	@echo "  $(GREEN)test$(NC)         - Run tests"
	@echo ""
	@echo "$(YELLOW)Advanced:$(NC)"
	@echo "  $(GREEN)setup$(NC)        - Full project setup"
	@echo "  $(GREEN)deploy$(NC)       - Deploy application"
	@echo "  $(GREEN)full-clean$(NC)   - Complete cleanup"

# Install dependencies
install:
	npm install

# Development server
dev:
	npm run dev

# Build application
build:
	npm run build

# Start production application
start:
	npm run start

# Start on production port
prod:
	npm run prod

# Check code with ESLint
lint:
	npm run lint

# Clean temporary files
clean:
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf .turbo

# Format code
format:
	npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,scss,md}"

# Generate Prisma client
db-generate:
	npx prisma generate

# Run database migrations
db-migrate:
	npx prisma migrate dev

# Reset database
db-reset:
	@read -p "Are you sure you want to reset the database? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	npx prisma migrate reset

# Start Docker container
docker-run:
	@echo "$(GREEN)Starting Docker container...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Container started on port $(PORT)!$(NC)"

# Stop Docker container
docker-stop:
	@echo "$(YELLOW)Stopping Docker container...$(NC)"
	docker-compose down
	@echo "$(GREEN)Container stopped!$(NC)"

# Check dependencies
check-deps:
	@echo "$(GREEN)Checking dependencies...$(NC)"
	npm audit
	npx snyk test
	@echo "$(GREEN)Dependency check completed!$(NC)"
