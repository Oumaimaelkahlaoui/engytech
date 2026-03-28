// compress-images.mjs
// Lance depuis frontend/ : node compress-images.mjs
// Prérequis : npm install sharp

import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, 'public')
const QUALITY = 82
const EXTS = ['.jpg', '.jpeg', '.png']

function getAllFiles(dir) {
  const results = []
  for (const f of readdirSync(dir)) {
    const full = join(dir, f)
    if (statSync(full).isDirectory()) results.push(...getAllFiles(full))
    else if (EXTS.includes(extname(f).toLowerCase())) results.push(full)
  }
  return results
}

async function run() {
  const files = getAllFiles(PUBLIC_DIR)
  console.log(`\n📁 ${files.length} image(s) trouvée(s) dans /public\n`)

  let totalBefore = 0, totalAfter = 0

  for (const file of files) {
    const name = basename(file, extname(file))
    const out  = join(dirname(file), `${name}.webp`)
    const before = statSync(file).size
    await sharp(file).webp({ quality: QUALITY }).toFile(out)
    const after = statSync(out).size
    totalBefore += before
    totalAfter  += after
    const saved = Math.round((1 - after / before) * 100)
    console.log(`✅  ${basename(file).padEnd(20)} ${(before/1024).toFixed(0)} KiB → ${(after/1024).toFixed(0)} KiB  (−${saved}%)`)
  }

  console.log(`\n🎉 Total : ${(totalBefore/1024/1024).toFixed(1)} Mo → ${(totalAfter/1024/1024).toFixed(1)} Mo`)
  console.log('\n📝 Remplace maintenant les src dans tes composants :')
  console.log('   ex: src="/img1.jpg"  →  src="/img1.webp"\n')
}

run().catch(err => {
  console.error('Erreur :', err.message)
  console.error('→ Lance d\'abord : npm install sharp')
})
