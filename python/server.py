#!/usr/bin/env python3
"""
Flask server wrapper for Microsoft's Markitdown converter.
Provides a REST API for the Electron app to communicate with.
"""

import os
import sys
import json
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from markitdown import MarkItDown

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for Electron frontend

# Initialize MarkItDown converter
converter = MarkItDown()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify server is running."""
    return jsonify({'status': 'healthy', 'service': 'markitdown-server'}), 200

@app.route('/convert', methods=['POST'])
def convert_to_markdown():
    """
    Convert a file to Markdown.
    Expects JSON with 'file_path' field.
    """
    try:
        data = request.get_json()

        if not data or 'file_path' not in data:
            return jsonify({
                'error': 'Missing file_path in request'
            }), 400

        file_path = data['file_path']

        # Check if file exists
        if not os.path.exists(file_path):
            return jsonify({
                'error': f'File not found: {file_path}'
            }), 404

        # Check if file is readable
        if not os.access(file_path, os.R_OK):
            return jsonify({
                'error': f'File is not readable: {file_path}'
            }), 403

        # Perform conversion
        try:
            result = converter.convert(file_path)

            # Extract the text content
            markdown_content = result.text_content if hasattr(result, 'text_content') else str(result)

            return jsonify({
                'success': True,
                'markdown': markdown_content,
                'file_path': file_path,
                'file_name': os.path.basename(file_path)
            }), 200

        except Exception as conv_error:
            # Conversion-specific error
            error_msg = str(conv_error)
            print(f"Conversion error for {file_path}: {error_msg}", file=sys.stderr)

            return jsonify({
                'error': f'Conversion failed: {error_msg}',
                'file_path': file_path
            }), 500

    except Exception as e:
        # General error
        error_trace = traceback.format_exc()
        print(f"Server error: {error_trace}", file=sys.stderr)

        return jsonify({
            'error': f'Server error: {str(e)}'
        }), 500

@app.route('/supported_formats', methods=['GET'])
def get_supported_formats():
    """Return list of supported file formats."""
    formats = {
        'documents': ['pdf', 'docx', 'doc', 'pptx', 'ppt', 'xlsx', 'xls'],
        'web': ['html', 'htm', 'xml'],
        'text': ['txt', 'md', 'rst'],
        'images': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'],
        'audio': ['mp3', 'wav'],
        'other': ['csv', 'json', 'eml', 'msg', 'epub', 'ipynb']
    }

    return jsonify({
        'formats': formats,
        'total': sum(len(v) for v in formats.values())
    }), 200

@app.route('/version', methods=['GET'])
def get_version():
    """Return version information."""
    try:
        import markitdown
        markitdown_version = getattr(markitdown, '__version__', 'unknown')
    except:
        markitdown_version = 'unknown'

    return jsonify({
        'server_version': '1.0.0',
        'markitdown_version': markitdown_version,
        'python_version': sys.version
    }), 200

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({'error': 'Internal server error'}), 500

def main():
    """Main entry point for the server."""
    # Get port from environment or use default
    port = int(os.environ.get('MARKITDOWN_PORT', 5678))

    # Get debug mode from environment
    debug = os.environ.get('FLASK_ENV') == 'development'

    print(f"Starting Markitdown server on port {port}...")
    print(f"Debug mode: {debug}")

    try:
        # Start the Flask server
        app.run(
            host='127.0.0.1',
            port=port,
            debug=debug,
            threaded=True
        )
    except Exception as e:
        print(f"Failed to start server: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()