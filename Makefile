deploy:
	rm dist/*
	npm run-script build
	cd dist; git add --all; git commit -m "New release `date`"; git push;
start:
	npm run-script start

.PHONY: deploy start