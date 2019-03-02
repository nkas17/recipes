module.exports = {
	extends: [
		"airbnb",
		"prettier",
		"prettier/react"
	],
	plugins: [
		"prettier"
	],
	env: {
		browser: true,
		commonjs: true,
		node: true,
		jest: true,
	},
	rules: {
		indent: [
			"error",
			"tab",
		],
		"react/jsx-indent": [
			"error",
			"tab",
		],
		"react/jsx-indent-props": [
			"error",
			"tab",
		],
		"react/jsx-one-expression-per-line": "off",
		"no-tabs": "off",
		"no-plusplus": "off",
		"no-underscore-dangle": "off",
		"jsx-a11y/label-has-for": "off",
		"import/prefer-default-export": "off",
		quotes: [
			"error",
			"single",
			{
				allowTemplateLiterals: true,
			},
		],
		"prettier/prettier": [
			"error",
			{
				trailingComma: "es5",
				singleQuote: true,
				printWidth: 80,
				useTabs: true
			}
		],
	}
}
