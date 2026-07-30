const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building subproject: projects/projeto1-portfolio-react...');
execSync('npm install', { cwd: path.join(__dirname, 'projects/projeto1-portfolio-react'), stdio: 'inherit' });
execSync('npm run build', { cwd: path.join(__dirname, 'projects/projeto1-portfolio-react'), stdio: 'inherit' });

const srcDist = path.join(__dirname, 'projects/projeto1-portfolio-react/dist');
const targetDist = path.join(__dirname, 'dist');

if (fs.existsSync(targetDist)) {
  fs.rmSync(targetDist, { recursive: true, force: true });
}

fs.cpSync(srcDist, targetDist, { recursive: true });
console.log('Successfully built and copied dist to root!');
