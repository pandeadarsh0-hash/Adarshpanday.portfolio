$port = 8080
$root = $PSScriptRoot

try {
    $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
    $listener.Start()
    Write-Output "Spotlyt portfolio server running at http://localhost:$port/"
    
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $writer = New-Object System.IO.StreamWriter($stream)
        
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }
        
        # Read remaining headers
        while (-not [string]::IsNullOrEmpty($reader.ReadLine())) {}
        
        $parts = $requestLine.Split(" ")
        if ($parts.Length -ge 2) {
            $rawPath = $parts[1].Split("?")[0]
            if ($rawPath -eq "/" -or $rawPath -eq "") {
                $rawPath = "/index.html"
            }
            $relPath = [System.Uri]::UnescapeDataString($rawPath.TrimStart("/")).Replace("/", "\")
            $fullPath = Join-Path $root $relPath
            
            if (Test-Path $fullPath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
                $mime = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css" }
                    ".js"   { "application/javascript" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".png"  { "image/png" }
                    ".svg"  { "image/svg+xml" }
                    ".ico"  { "image/x-icon" }
                    ".mp4"  { "video/mp4" }
                    Default { "application/octet-stream" }
                }
                
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1>")
                $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($notFound, 0, $notFound.Length)
            }
        }
        $writer.Flush()
        $stream.Close()
        $client.Close()
    }
} finally {
    if ($listener) {
        $listener.Stop()
    }
}

