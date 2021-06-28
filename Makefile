migration-create:
	npm run typeorm migration:create -- -n $(NAME)

migration-list:
	npm run typeorm migration:show

migrate-revert:
	npm run typeorm migration:revert

migrate-run:
	npm run typeorm migration:run