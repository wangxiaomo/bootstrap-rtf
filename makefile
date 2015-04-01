build:
	gulp clean && gulp

gulp:
	coffee -b -c gulpfile.coffee

init:
	bower install
	npm install
