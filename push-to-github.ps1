# Script de Automação para Push do Portfólio ao GitHub

$RepoUrl = Read-Host "Por favor, cole o URL do seu repositório GitHub (ex: https://github.com/usuario/projeto.git)"

if (-not $RepoUrl) {
    Write-Host "URL inválido. Abortando..." -ForegroundColor Red
    exit
}

Write-Host "Conectando ao repositório remoto..." -ForegroundColor Cyan
git remote add origin $RepoUrl

Write-Host "Enviando arquivos para o GitHub..." -ForegroundColor Cyan
git push -u origin master

Write-Host "Sucesso! Seu portfólio agora está online." -ForegroundColor Green
Write-Host "Acesse em: $RepoUrl" -ForegroundColor Green
pause
