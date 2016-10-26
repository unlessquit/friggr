start: node_modules
	npm start

delayed-start:
	sleep 5 # 'wait' for devel postgres to start
	$(MAKE) start

test: node_modules
	npm test

build-image: node_modules
	docker build -t unlessquit/friggr-web .

push-image: build-image
	docker push unlessquit/friggr-web

node_modules: package.json
	npm install
