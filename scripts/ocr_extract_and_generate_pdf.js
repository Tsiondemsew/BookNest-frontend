const fs = require('fs').promises
const path = require('path')
const { createCanvas, DOMMatrix, DOMPoint, DOMRect } = require('@napi-rs/canvas')

// polyfill DOM classes for pdfjs
global.DOMMatrix = DOMMatrix
global.DOMPoint = DOMPoint
global.DOMRect = DOMRect

let pdfjs = null
const Tesseract = require('tesseract.js')
const PDFDocument = require('pdfkit')

async function renderPageToImage(doc, pageNum) {
  const page = await doc.getPage(pageNum)
  const viewport = page.getViewport({ scale: 2.0 })
  const canvas = createCanvas(viewport.width, viewport.height)
  const context = canvas.getContext('2d')
  const renderContext = {
    canvasContext: context,
    viewport,
  }
  await page.render(renderContext).promise
  return canvas.toBuffer('image/png')
}

async function extractTextFromPdf(pdfPath, outTxtPath, outPdfPath) {
  if (!pdfjs) pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const dataBuf = await fs.readFile(pdfPath)
  const data = new Uint8Array(dataBuf)
  const loadingTask = pdfjs.getDocument({ data })
  const doc = await loadingTask.promise
  let allText = ''

  for (let i = 1; i <= doc.numPages; i++) {
    console.log('Rendering page', i)
    const imgBuf = await renderPageToImage(doc, i)
    console.log('OCR page', i)
    const { data: { text } } = await Tesseract.recognize(imgBuf, 'amh', { logger: m => {} })
    allText += `\n\n-- Page ${i} --\n\n` + text
  }

  await fs.writeFile(outTxtPath, allText, 'utf8')
  console.log('Wrote text to', outTxtPath)

  // Generate new PDF from the extracted text
  const docPdf = new PDFDocument({ autoFirstPage: false })
  const writeStream = require('fs').createWriteStream(outPdfPath)
  docPdf.pipe(writeStream)
  const lines = allText.split('\n')
  const pageHeight = 720
  const margin = 50
  const maxLinesPerPage = 40

  for (let i = 0; i < lines.length; i += maxLinesPerPage) {
    docPdf.addPage({ size: 'A4', margin })
    const chunk = lines.slice(i, i + maxLinesPerPage).join('\n')
    docPdf.font('Times-Roman').fontSize(12).text(chunk, { width: 500 })
  }

  docPdf.end()
  await new Promise((res, rej) => writeStream.on('finish', res).on('error', rej))
  console.log('Wrote extracted PDF to', outPdfPath)
}

async function run() {
  try {
    const pdfPath = path.resolve(__dirname, '..', 'public', 'እቴሜቴ ሎሚ ሽታ - አዳም ረታ.pdf')
    const outTxt = path.resolve(__dirname, '..', 'public', 'ebook-1-ocr.txt')
    const outPdf = path.resolve(__dirname, '..', 'public', 'ebook-1-extracted.pdf')
    await extractTextFromPdf(pdfPath, outTxt, outPdf)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
