@echo off
echo Skickar upp andringar till GitHub...
git add .
set /p "msg=Skriv commit-meddelande (eller tryck Enter for standard): "
if "%msg%"=="" set msg=Automatiskt uppdaterat via skript
git commit -m "%msg%"
git push origin main
echo.
echo Klart! Tryck valfri tangent for att stänga fonstret.
pause >nul