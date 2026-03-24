const fs = require('fs');
const path = require('path');
const dir = "D:\\Trinity Indonesia\\Minecraft Server\\Anarchy Economy 2.0\\plugins\\ExcellentEnchants\\enchants";

if (!fs.existsSync(dir)) {
    console.error("Directory not found");
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml'));
let lines = [];

files.forEach(f => {
    const text = fs.readFileSync(path.join(dir, f), 'utf-8');
    
    const nameMatch = text.match(/^name: '(.*?)'/m);
    const maxMatch = text.match(/^max_level: (\d+)/m);
    const descMatch = text.match(/description:[\s\S]*?- '([^']+)'/);
    const primaryMatch = text.match(/^primary_items:\s*([\s\S]*?)(?:^secondary_items:|^conflicts:|^settings:)/m);
    const secondaryMatch = text.match(/^secondary_items:\s*([\s\S]*?)(?:^conflicts:|^settings:)/m);
    const typeMatch = text.match(/^type: (.*?)$/m);

    let name = nameMatch ? nameMatch[1] : f.replace('.yml', '');
    let max = maxMatch ? maxMatch[1] : '?';
    let desc = descMatch ? descMatch[1] : '';
    let type = typeMatch ? typeMatch[1] : '';
    
    let primary = '';
    if (primaryMatch && primaryMatch[1]) {
        primary = primaryMatch[1].split('\n')
            .map(s => s.replace(/^- /, '').trim())
            .filter(s => s.length > 0)
            .join(',');
    }

    let secondary = '';
    if (secondaryMatch && secondaryMatch[1]) {
        secondary = secondaryMatch[1].split('\n')
            .map(s => s.replace(/^- /, '').trim())
            .filter(s => s.length > 0)
            .join(',');
    }

    lines.push(`${name}|${max}|${type}|${primary}|${secondary}|${desc}`);
});

fs.writeFileSync('enchants_parsed.txt', lines.join('\n'));
console.log('Saved to enchants_parsed.txt');
