const presets = [
		"@babel/react",
		["@babel/env",{
        "modules": false
      }]
	];
const plugins= ["lodash"];


module.exports = { presets, plugins };
