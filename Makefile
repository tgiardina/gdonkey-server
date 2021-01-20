.PHONY: help
help:
	@echo 'make dev - Starts a dev server.'	

.PHONY: dev
dev: 
	docker-compose up