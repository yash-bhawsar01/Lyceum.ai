Set WshShell = CreateObject("WScript.Shell")

Set FSO = CreateObject("Scripting.FileSystemObject")

currentDir = FSO.GetParentFolderName(WScript.ScriptFullName)

' OPEN SPLASH
WshShell.Run "mshta.exe """ & currentDir & "\splash.hta""", 1, False

' START OLLAMA
WshShell.Run "cmd /c cd /d """ & currentDir & """ && ollama run phi3", 0, False

' WAIT FOR MODEL
WScript.Sleep 9000

' START SERVER
WshShell.Run "cmd /c cd /d """ & currentDir & """ && node server.js", 0, False

' WAIT
WScript.Sleep 4000

' OPEN THINKARIUM
WshShell.Run "http://localhost:5000"

' WAIT A LITTLE
WScript.Sleep 2000

' CLOSE SPLASH
WshShell.Run "taskkill /IM mshta.exe /F", 0, False