const fs = require('fs').promises
const path = require('path')

async function extractWithPdfjs(pdfPath, outPath) {
  // Prefer pdf-parse/node if available for simple extraction
  try {
    // Try requiring the packaged Node CJS build directly
    console.log('Trying pdf-parse CJS (by path)...')
    const pdfParsePath = path.resolve(__dirname, '..', 'node_modules', 'pdf-parse', 'dist', 'node', 'cjs', 'index.cjs')
    const pdfParse = require(pdfParsePath)
    console.log('pdf-parse loaded from', pdfParsePath, 'type:', typeof pdfParse, 'keys:', Object.keys(pdfParse || {}))
    const data = await fs.readFile(pdfPath)
    const res = await pdfParse(data)
    await fs.writeFile(outPath, res.text || '', 'utf8')
    console.log('Extraction via pdf-parse succeeded')
    return
  } catch (e) {
    console.error('pdf-parse extraction failed:', e && e.message)
    // fallback to pdfjs-dist
  }
  try {
    console.log('Trying pdf-parse ESM...')
    const mod = await import('pdf-parse/dist/node/esm/index.js')
    const pdfParseEs = mod.default || mod
    const data = await fs.readFile(pdfPath)
    const res = await pdfParseEs(data)
    await fs.writeFile(outPath, res.text || '', 'utf8')
    console.log('Extraction via pdf-parse ESM succeeded')
    return
  } catch (e) {
    console.error('pdf-parse ESM failed:', e && e.message)
  }

  const pdfjs = await import('pdfjs-dist/build/pdf.mjs')
  const data = await fs.readFile(pdfPath)
  const loadingTask = pdfjs.getDocument({ data })
  const doc = await loadingTask.promise
  let fullText = ''
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const strings = content.items.map((s) => s.str)
    fullText += strings.join(' ') + '\n\n'
  }
  await fs.writeFile(outPath, fullText, 'utf8')
}

async function run() {
  try {
    const pdfPath = path.resolve(__dirname, '..', 'public', 'እቴሜቴ ሎሚ ሽታ - አዳም ረታ.pdf')
    const outPath = path.resolve(__dirname, '..', 'public', 'ebook-1.txt')
    await extractWithPdfjs(pdfPath, outPath)
    console.log('Wrote extracted text to', outPath)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
