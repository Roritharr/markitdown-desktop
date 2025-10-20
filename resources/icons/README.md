# Icon Resources

This directory contains icon files for the Markitdown Desktop application.

## Current Status

The `icon.png` file is a placeholder icon for development purposes. It consists of a blue square with white "MD" text.

## Production Icons Required

For production release, proper application icons should be created for each platform:

### macOS
- **Format**: `.icns` (Apple Icon Image format)
- **Sizes needed**: Multiple resolutions bundled in the .icns file
  - 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024 (both 1x and 2x versions)
- **Tool**: Use `iconutil` or tools like Image2icon, Icon Composer
- **File**: `icon.icns`

### Windows
- **Format**: `.ico` (Windows Icon format)
- **Sizes needed**: Multiple resolutions bundled in the .ico file
  - 16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256
- **Tool**: Use ImageMagick, GIMP, or online converters
- **File**: `icon.ico`

### Linux
- **Format**: `.png` (Portable Network Graphics)
- **Sizes needed**: Multiple resolutions
  - Common: 16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256, 512x512
- **Files**: Individual PNG files for each size, or a single high-resolution PNG (512x512 or 1024x1024)

## Design Guidelines

When creating production icons:

1. **Consistency**: Ensure the icon design is consistent across all platforms
2. **Clarity**: The icon should be recognizable at small sizes (16x16)
3. **Platform Guidelines**: Follow platform-specific design guidelines
   - macOS: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
   - Windows: [Windows App Icon Guidelines](https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design)
   - Linux: Follow freedesktop.org icon specifications

4. **Brand Identity**: The icon should reflect the Markitdown brand and purpose
5. **File Conversion**: Start with a high-resolution master (e.g., 1024x1024 PNG or SVG) and scale down

## Generating Icons from Source

Once you have a high-resolution source icon, you can use electron-builder to automatically generate the required formats. Update `electron-builder.yml` with the appropriate icon paths.

Example electron-builder configuration:
```yaml
mac:
  icon: resources/icons/icon.icns
win:
  icon: resources/icons/icon.ico
linux:
  icon: resources/icons/icon.png
```

## Tools and Resources

- **ImageMagick**: Command-line tool for image conversion
- **iconutil** (macOS): Convert iconset to icns format
- **electron-icon-builder**: npm package for generating icons
- **Icon generators**: Online tools like cloudconvert.com, icoconvert.com
