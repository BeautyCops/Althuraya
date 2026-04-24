# One-time: generates 01.png .. 06.png as placeholders. Replace with real Canva exports.
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$w = 1200
$h = 800
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
for ($i = 1; $i -le 6; $i++) {
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $c = 100 + $i * 30
  $g.Clear([System.Drawing.Color]::FromArgb(18, 8, 45))
  $font = [System.Drawing.Font]::new("Arial", 36, [System.Drawing.FontStyle]::Bold)
  $br = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 200, 255))
  $g.DrawString("PLACEHOLDER {0:00} - replace with Canva export PNG" -f $i, $font, $br, 40, 320)
  $out = Join-Path $base ("{0:00}.png" -f $i)
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}
# Brand mark placeholder (wide logo strip)
$logoDir = Join-Path (Split-Path -Parent $base) "brand"
if (-not (Test-Path $logoDir)) { New-Item -ItemType Directory -Path $logoDir | Out-Null }
$lw = 400
$lh = 100
$lb = New-Object System.Drawing.Bitmap -ArgumentList $lw, $lh
$lg = [System.Drawing.Graphics]::FromImage($lb)
$lg.Clear([System.Drawing.Color]::FromArgb(18, 8, 45))
$lf = [System.Drawing.Font]::new("Arial", 28, [System.Drawing.FontStyle]::Bold)
$lbr = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 210, 255))
$lg.DrawString("Althuraya logo (replace)", $lf, $lbr, 20, 28)
$lp = Join-Path $logoDir "logo.png"
$lb.Save($lp, [System.Drawing.Imaging.ImageFormat]::Png)
$lg.Dispose()
$lb.Dispose()

Write-Host "Done. Replace 01-06.png and brand/logo.png with real Canva exports."
