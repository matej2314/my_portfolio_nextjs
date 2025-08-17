# Makefile for my_portfolio_nextjs project
# Author: Mateusz Śliwowski

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
