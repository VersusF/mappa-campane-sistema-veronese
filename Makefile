deploy:
	npm run-script build
	git subtree push --prefix dist origin gh-page
start:
	npm run-script start

.PHONY: deploy start