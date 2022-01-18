const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );

module.exports = {
	...defaultConfig,
	entry: {
		backend: './src/backend.js',
		global: './src/scss/index.scss'
		//frontend: './src/frontend.js',
	},
};
