BIN=./node_modules/.bin/
BUILD=./build/
SRC=./src/

build:
	@mkdir -p ./build
	@rm -rf ${BUILD}*
	@${BIN}node-sass ${SRC}css/main.scss ${BUILD}css/main.css
	@${BIN}webpack ${SRC}js/main.js ${BUILD}js/main.js
	@cp ${SRC}index.html ${BUILD}index.html

test:
	@${BIN}mocha ${SRC}**/*.test.js

watch: build
	@${BIN}nodemon --watch ${SRC} --ext js,scss,html --exec "make test;make build;"

.PHONY: build
