const fs = require('fs');
const path = require('path');

function convertToUtf8(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.startsWith('.')) continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && file !== 'node_modules') {
            convertToUtf8(fullPath);
        } else if (file.endsWith('.json') || file.endsWith('.md') || file.endsWith('.mdx')) {
            let buffer = fs.readFileSync(fullPath);
            if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                let content = buffer.toString('utf16le');
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                // Also remove null bytes just in case
                content = content.replace(/\0/g, '');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed UTF-16LE file:', fullPath);
            } else if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                let content = buffer.toString('utf8');
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed UTF-8 BOM file:', fullPath);
            } else if (buffer.includes(0x00)) {
                // If it contains null bytes but no BOM, it might be utf16 without BOM
                let content = buffer.toString('utf16le');
                content = content.replace(/\0/g, '');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed bare UTF-16 file:', fullPath);
            }
        }
    }
}
convertToUtf8('.');
console.log('Done scanning.');
