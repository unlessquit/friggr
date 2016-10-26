start:
	docker-compose up

stop:
	docker-compose stop

connect-db:
	#
	# Requires app to be started.
	#
	psql -h localhost -U postgres

test:
	$(MAKE) -C web test

release:
	$(MAKE) -C web push-image
