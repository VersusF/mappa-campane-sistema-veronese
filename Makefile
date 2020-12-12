deploy:
	npm run-script build
	cd dist
	git add --all
	git commit -m "Release at $(date)" 
	git push
	cd ..
start:
	npm run-script start

.PHONY: deploy start