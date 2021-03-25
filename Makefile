.PHONY: deploy
deploy:
	cd dist; git rm -rf . ; git clean -fxd;
	npm run-script build
	cd dist; git add --all; git commit -m "New release `date`"; git push;

.PHONY: start
start:
	npm run-script start
