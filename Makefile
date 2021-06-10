install:
	npm install

start:
	npx babel-node src/bin/page-loader.js https://ru.hexlet.io/courses

publish:
	npm publish --dry-run

test:
	npm test

watch:
	npm test --watch
	
lint:
	npx eslint .