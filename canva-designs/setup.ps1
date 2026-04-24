# Althuraya × Canva — Secure .env setup
# Prompts for the Client Secret without echoing it, then writes .env safely.

[CmdletBinding()]
param(
    [string]$ClientId = "OC-AZ23fG0IC40H",
    [string]$RedirectUri = "http://127.0.0.1:3000/oauth/callback"
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envPath = Join-Path $scriptDir ".env"

Write-Host ""
Write-Host "=== Althuraya Canva Setup ===" -ForegroundColor Magenta
Write-Host ""
Write-Host "Client ID    : $ClientId" -ForegroundColor Gray
Write-Host "Redirect URI : $RedirectUri" -ForegroundColor Gray
Write-Host ""
Write-Host "Paste your Client Secret below (starts with cnvca...)." -ForegroundColor Cyan
Write-Host "The input will be hidden for security." -ForegroundColor Yellow
Write-Host ""

$secure = Read-Host -Prompt "Client Secret" -AsSecureString
$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
    $secret = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr).Trim()
} finally {
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}

if ([string]::IsNullOrWhiteSpace($secret)) {
    Write-Host "ERROR: Empty secret. Aborted." -ForegroundColor Red
    exit 1
}

if (-not $secret.StartsWith("cnvca")) {
    Write-Host ""
    Write-Host "WARNING: Secret does not start with 'cnvca'. Continue anyway? (y/N)" -ForegroundColor Yellow
    $answer = Read-Host
    if ($answer -ne "y" -and $answer -ne "Y") {
        Write-Host "Aborted." -ForegroundColor Red
        exit 1
    }
}

$content = @"
CANVA_CLIENT_ID=$ClientId
CANVA_CLIENT_SECRET=$secret
CANVA_REDIRECT_URI=$RedirectUri
"@

Set-Content -Path $envPath -Value $content -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "OK: .env written to:" -ForegroundColor Green
Write-Host "    $envPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Next step:" -ForegroundColor Cyan
Write-Host "    node list-designs.mjs" -ForegroundColor White
Write-Host ""
