# Markitdown Desktop

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/mariohachemer/markitdown-desktop/workflows/Build%20and%20Release/badge.svg)](https://github.com/mariohachemer/markitdown-desktop/actions)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)](https://github.com/mariohachemer/markitdown-desktop/releases)

A cross-platform desktop application wrapper for Microsoft's [Markitdown](https://github.com/microsoft/markitdown) converter. Convert various document formats to Markdown with a simple drag-and-drop interface.

![Markitdown Desktop Screenshot](resources/screenshot.png)

## Features

- 🎯 **Simple Drag & Drop Interface** - Just drag your files into the app
- 📄 **Wide Format Support** - PDF, Word, PowerPoint, Excel, HTML, Images, Audio, and more
- 🖥️ **Cross-Platform** - Works on macOS, Windows, and Linux
- 🚀 **Fast Conversion** - Powered by Microsoft's Markitdown engine
- 📋 **Easy Export** - Copy to clipboard or save as Markdown file
- 🎨 **Modern UI** - Clean, intuitive interface built with Electron
- ⚡ **Lightning-Fast Builds** - Uses UV for 10-100x faster Python dependency installation

## Supported Formats

- **Documents**: PDF, DOCX, DOC, PPTX, PPT, XLSX, XLS
- **Web**: HTML, HTM, XML
- **Text**: TXT, MD, RST
- **Images**: JPG, JPEG, PNG, GIF, BMP, TIFF
- **Audio**: MP3, WAV
- **Other**: CSV, JSON, EML, MSG, EPUB, IPYNB (Jupyter Notebooks)

## Installation

### Download Pre-built Binaries

Download the latest release for your platform from the [Releases](https://github.com/mariohachemer/markitdown-desktop/releases) page:

- **macOS**: Download `.dmg` file
- **Windows**: Download `.exe` installer
- **Linux**: Choose from `.AppImage`, `.deb`, or `.rpm`

### Build from Source

#### Quick Setup (Recommended)

```bash
git clone https://github.com/mariohachemer/markitdown-desktop.git
cd markitdown-desktop
./setup.sh
```

The setup script will automatically:
- Check for Node.js and Python
- Install UV if not present
- Install all dependencies

#### Manual Setup

##### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- [UV](https://github.com/astral-sh/uv) (faster alternative to pip)
- Git

##### Steps

1. Clone the repository:
```bash
git clone https://github.com/mariohachemer/markitdown-desktop.git
cd markitdown-desktop
```

2. Install UV (if not already installed):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

3. Install dependencies:
```bash
npm install
cd python
uv pip install --system -r requirements.txt
cd ..
```

4. Run in development mode:
```bash
# Terminal 1: Start Python server
cd python
python server.py

# Terminal 2: Start Electron app
npm run dev
```

5. Build for production:
```bash
# Build Python executable
cd python
pyinstaller --onefile --name markitdown-server server.py
cd ..

# Build Electron app
npm run dist
```

## Development

### Project Structure

```
markitdown-desktop/
├── src/
│   ├── main/          # Electron main process
│   ├── renderer/      # UI (HTML/CSS/JS)
│   └── preload/       # Preload scripts
├── python/
│   ├── server.py      # Flask API server
│   └── requirements.txt
├── resources/         # App icons
├── .github/workflows/ # CI/CD
└── electron-builder.yml
```

### Available Scripts

```bash
npm run start       # Start Electron app
npm run dev         # Start in development mode
npm run dist        # Build distributable
npm run dist:mac    # Build for macOS
npm run dist:win    # Build for Windows
npm run dist:linux  # Build for Linux
```

### Testing

```bash
# Test Python server
cd python
python -m pytest tests/

# Test Electron app
npm test
```

## CI/CD and Release Process

This project uses GitHub Actions for automated builds and releases:

1. **Create a new tag**: `git tag v1.0.0 && git push --tags`
2. **GitHub Actions** automatically:
   - Builds for all platforms
   - Creates draft release
   - Uploads artifacts

### Setting up Code Signing (Optional)

For production releases, configure these GitHub Secrets:

**macOS:**
- `MAC_CERTS`: Base64 encoded .p12 certificate
- `MAC_CERTS_PASSWORD`: Certificate password
- `APPLE_ID`: Your Apple Developer ID
- `APPLE_PASSWORD`: App-specific password
- `APPLE_TEAM_ID`: Your Apple Team ID

**Windows:**
- `WIN_CERTS`: Base64 encoded .pfx certificate
- `WIN_CERTS_PASSWORD`: Certificate password

## License and Attribution

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Credits

This application is a wrapper for Microsoft's [Markitdown](https://github.com/microsoft/markitdown) converter. Markitdown is Copyright (c) Microsoft Corporation and is licensed under the MIT License.

See [NOTICE.txt](NOTICE.txt) for full attribution and third-party licenses.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Python Server Not Starting

- Ensure Python 3.10+ is installed
- Check if port 5678 is available
- Ensure UV is installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Try reinstalling dependencies: `cd python && uv pip install --system -r requirements.txt`

### Conversion Errors

- Verify the file format is supported
- Check file permissions
- Some complex documents may not convert perfectly

### macOS Security Warning

If macOS blocks the app:
1. Go to System Preferences > Security & Privacy
2. Click "Open Anyway" for Markitdown Desktop
3. Or right-click the app and select "Open"

## Support

- **Bug Reports**: [Open an issue](https://github.com/mariohachemer/markitdown-desktop/issues)
- **Feature Requests**: [Start a discussion](https://github.com/mariohachemer/markitdown-desktop/discussions)
- **Markitdown Issues**: Report to [Microsoft's repository](https://github.com/microsoft/markitdown/issues)

## Roadmap

- [ ] Batch file conversion
- [ ] Custom conversion settings
- [ ] Theme customization
- [ ] Command-line interface
- [ ] Auto-update functionality
- [ ] Conversion history
- [ ] Plugin system

## Acknowledgments

- Microsoft for creating the excellent [Markitdown](https://github.com/microsoft/markitdown) library
- The Electron team for the framework
- All contributors and users of this project

---

Made with ❤️ by Mario Hachemer