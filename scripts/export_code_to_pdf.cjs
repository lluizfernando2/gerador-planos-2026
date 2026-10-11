const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function generateCodebasePDF() {
  console.log('Starting Codebase PDF Generation...');

  const rootDir = path.resolve(__dirname, '..');
  const outputFile = path.join(rootDir, 'codigo_completo_app.pdf');
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicOutputFile = path.join(publicDir, 'codigo_completo_app.pdf');

  // Directories and files to include
  const targetExtensions = new Set([
    '.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs', '.json', '.css', '.html', '.md', '.rules', '.example'
  ]);

  const ignoredDirs = new Set([
    'node_modules', 'dist', '.git', '.cache', 'coverage', '.temp'
  ]);

  const ignoredFiles = new Set([
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'buildInfo.json', 'codigo_completo_app.pdf'
  ]);

  function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!ignoredDirs.has(file)) {
          getAllFiles(fullPath, arrayOfFiles);
        }
      } else {
        const ext = path.extname(file);
        if (targetExtensions.has(ext) && !ignoredFiles.has(file)) {
          const relPath = path.relative(rootDir, fullPath);
          arrayOfFiles.push({
            fullPath,
            relPath,
            size: stat.size,
            ext
          });
        }
      }
    });

    return arrayOfFiles;
  }

  const rawFiles = getAllFiles(rootDir);

  // Sort files logically: config files first, then server, then src core, then components, features, lib, etc.
  rawFiles.sort((a, b) => {
    const orderScore = (p) => {
      if (p === 'package.json') return 1;
      if (p === 'tsconfig.json') return 2;
      if (p === 'vite.config.ts') return 3;
      if (p === 'server.ts') return 4;
      if (p === 'index.html') return 5;
      if (p.startsWith('server/')) return 10;
      if (p === 'src/main.tsx') return 20;
      if (p === 'src/App.tsx') return 21;
      if (p === 'src/types.ts') return 22;
      if (p.startsWith('src/features/')) return 30;
      if (p.startsWith('src/components/')) return 40;
      if (p.startsWith('src/hooks/')) return 50;
      if (p.startsWith('src/lib/')) return 60;
      if (p.startsWith('src/data/')) return 70;
      if (p.startsWith('src/__tests__/')) return 80;
      return 100;
    };
    const scoreA = orderScore(a.relPath);
    const scoreB = orderScore(b.relPath);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return a.relPath.localeCompare(b.relPath);
  });

  const filesWithContent = rawFiles.map(file => {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf8');
      const lines = content.split('\n');
      return {
        ...file,
        content,
        lineCount: lines.length,
        lines
      };
    } catch (e) {
      return {
        ...file,
        content: `// Error reading file: ${e.message}`,
        lineCount: 1,
        lines: [`// Error reading file: ${e.message}`]
      };
    }
  });

  const totalLines = filesWithContent.reduce((acc, f) => acc + f.lineCount, 0);
  const totalFiles = filesWithContent.length;

  console.log(`Found ${totalFiles} files with ${totalLines} total lines of code.`);

  // Create PDF
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 45, left: 40, right: 40 },
    autoFirstPage: false,
    bufferPages: true
  });

  const writeStream = fs.createWriteStream(outputFile);
  const publicWriteStream = fs.createWriteStream(publicOutputFile);

  doc.pipe(writeStream);
  doc.pipe(publicWriteStream);

  // 1. COVER PAGE
  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0f172a');

  doc.fillColor('#38bdf8').fontSize(26).font('Helvetica-Bold')
     .text('RELATÓRIO DE CÓDIGO FONTE COMPLETO', 50, 160, { align: 'center' });

  doc.fillColor('#f8fafc').fontSize(16).font('Helvetica')
     .text('Plataforma Pedagógica Currículo Priorizado 2026', 50, 210, { align: 'center' });

  doc.fillColor('#94a3b8').fontSize(11).font('Helvetica')
     .text('Exportação Integral de Arquivos para Análise de Engenharia & Diagnóstico', 50, 240, { align: 'center' });

  // Stats Box
  doc.rect(70, 310, doc.page.width - 140, 170).fill('#1e293b');
  doc.rect(70, 310, doc.page.width - 140, 170).stroke('#334155');

  doc.fillColor('#e2e8f0').fontSize(13).font('Helvetica-Bold')
     .text('RESUMO DO PROJETO', 90, 330);

  doc.fillColor('#94a3b8').fontSize(10).font('Helvetica')
     .text(`• Total de Arquivos Exportados: `, 90, 360)
     .fillColor('#38bdf8').font('Helvetica-Bold').text(`${totalFiles} arquivos`, 260, 360);

  doc.fillColor('#94a3b8').fontSize(10).font('Helvetica')
     .text(`• Total de Linhas de Código: `, 90, 385)
     .fillColor('#38bdf8').font('Helvetica-Bold').text(`${totalLines.toLocaleString('pt-BR')} linhas`, 260, 385);

  doc.fillColor('#94a3b8').fontSize(10).font('Helvetica')
     .text(`• Data da Exportação: `, 90, 410)
     .fillColor('#f8fafc').font('Helvetica-Bold').text(`${new Date().toLocaleString('pt-BR')}`, 260, 410);

  doc.fillColor('#94a3b8').fontSize(10).font('Helvetica')
     .text(`• Formato de Empacotamento: `, 90, 435)
     .fillColor('#34d399').font('Helvetica-Bold').text(`TypeScript / React 19 / Express / Vite`, 260, 435);

  doc.fillColor('#64748b').fontSize(9).font('Helvetica')
     .text('Documento gerado automaticamente para análise e revisão técnica completa.', 50, 720, { align: 'center' });

  // 2. TABLE OF CONTENTS
  doc.addPage();
  doc.fillColor('#0f172a').fontSize(18).font('Helvetica-Bold')
     .text('Índice de Arquivos do Projeto', 40, 40);

  doc.fillColor('#64748b').fontSize(9).font('Helvetica')
     .text(`Lista de todos os ${totalFiles} arquivos incluídos neste relatório:`, 40, 65);

  let tocY = 90;
  const tocPageHeight = doc.page.height - 60;

  filesWithContent.forEach((file, index) => {
    if (tocY > tocPageHeight) {
      doc.addPage();
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold')
         .text('Índice de Arquivos do Projeto (Continuação)', 40, 40);
      tocY = 70;
    }

    // Row Background
    if (index % 2 === 0) {
      doc.rect(40, tocY - 2, doc.page.width - 80, 16).fill('#f8fafc');
    }

    doc.fillColor('#1e293b').fontSize(8.5).font('Courier-Bold')
       .text(`${String(index + 1).padStart(2, '0')}. ${file.relPath}`, 45, tocY, { width: 380, ellipsis: true });

    doc.fillColor('#64748b').fontSize(8).font('Helvetica')
       .text(`${file.lineCount} lin | ${(file.size / 1024).toFixed(1)} KB`, 440, tocY, { align: 'right', width: 110 });

    tocY += 16;
  });

  // 3. FILE SOURCE CODE DUMP
  filesWithContent.forEach((file, fileIdx) => {
    doc.addPage();

    // Header banner for each file
    doc.rect(40, 35, doc.page.width - 80, 42).fill('#1e293b');
    doc.fillColor('#38bdf8').fontSize(11).font('Helvetica-Bold')
       .text(`[Arquivo ${fileIdx + 1}/${totalFiles}]  ${file.relPath}`, 50, 43, { width: 490, ellipsis: true });

    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica')
       .text(`Linhas: ${file.lineCount}  |  Tamanho: ${(file.size / 1024).toFixed(2)} KB  |  Tipo: ${file.ext}`, 50, 60);

    let codeY = 90;
    const bottomLimit = doc.page.height - 50;

    doc.font('Courier').fontSize(6.8);

    file.lines.forEach((line, lineIdx) => {
      if (codeY > bottomLimit) {
        doc.addPage();
        // Sub-header on continued pages
        doc.rect(40, 35, doc.page.width - 80, 20).fill('#334155');
        doc.fillColor('#f8fafc').fontSize(8).font('Helvetica-Bold')
           .text(`${file.relPath} (continuação)`, 50, 40, { width: 490, ellipsis: true });
        codeY = 65;
        doc.font('Courier').fontSize(6.8);
      }

      const lineNumStr = String(lineIdx + 1).padStart(4, ' ');
      // Truncate ultra-long lines to keep PDF render clean
      const safeLine = line.length > 130 ? line.substring(0, 127) + '...' : line;

      // Line number gutter
      doc.fillColor('#94a3b8').text(lineNumStr, 42, codeY, { width: 30, align: 'right' });
      doc.fillColor('#cbd5e1').text(' | ', 74, codeY);

      // Line text
      doc.fillColor('#1e293b').text(safeLine || ' ', 86, codeY, { width: 470 });

      codeY += 8.8;
    });
  });

  // 4. FOOTERS & PAGE NUMBERS
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    if (i === 0) continue; // Skip cover page

    doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
       .text('Plano de Ensino 2026 - Código Fonte Oficial', 40, doc.page.height - 30);

    doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
       .text(`Página ${i + 1} de ${range.count}`, doc.page.width - 150, doc.page.height - 30, { align: 'right', width: 110 });
  }

  doc.end();

  await new Promise((resolve) => {
    writeStream.on('finish', resolve);
  });

  console.log(`PDF Generated successfully at:\n- ${outputFile}\n- ${publicOutputFile}`);
}

generateCodebasePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
