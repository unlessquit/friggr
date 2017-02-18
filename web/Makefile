.PHONY: client

start-dev: node_modules client-node_modules
	npm run dev

delayed-start-dev:
	sleep 5 # 'wait' for devel postgres to start
	$(MAKE) start-dev

test: node_modules
	npm test

build-image: node_modules build-client
	docker build -t unlessquit/friggr-web .

push-image: build-image
	docker push unlessquit/friggr-web

node_modules: package.json
	npm install

build-client:
	$(MAKE) -C client build

client-node_modules:
	$(MAKE) -C client node_modules
