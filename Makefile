start:
	$(MAKE) -C web start

test:
	$(MAKE) -C web test

release:
	$(MAKE) -C web push-image
