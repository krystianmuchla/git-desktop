const esbuild = require('esbuild')
const fs = require('node:fs')

build().catch((error) => console.error('Failed to build app', error))

async function build() {
	const result = await esbuild.build({
		entryPoints: ['src/root.jsx'],
		bundle: true,
		minify: true,
		write: false,
		outdir: 'dist',
		loader: { '.svg': 'dataurl' },
		jsx: 'automatic',
	})

	let jsCode = ''
	let cssCode = ''

	for (const file of result.outputFiles) {
		if (file.path.endsWith('.js')) jsCode = file.text
		if (file.path.endsWith('.css')) cssCode = file.text
	}

	const html = [
		'<!DOCTYPE html>',
		'<html lang="en">',
		'<head>',
		'<meta charset="UTF-8">',
		'<title>Git Desktop</title>',
		`<style>${cssCode}</style>`,
		'</head>',
		'<body>',
		'<div id="root"></div>',
		`<script>${jsCode}</script>`,
		'</body>',
		'</html>',
	]

	fs.writeFileSync('index.html', html.join(''))
}
