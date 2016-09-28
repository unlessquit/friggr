start:
	docker-compose up

connect-db:
	#
	# Requires app to be started.
	#
	psql -h localhost -U postgres

test:
	$(MAKE) -C web test

release:
	$(MAKE) -C web push-image
