const returnImgPath = (extension: string) => {
  switch (extension) {
    // Special cases
    case "collapse-ctext":
      return "../src/assets/images/collapse.png";
    case "makefile":
      return "../src/assets/images/makefile-icon.png"

    // Folder types
    case "folder":
      return "../../src/assets/images/folder-icon.png";

    // Lang icons
    case "html":
      return "../../src/assets/images/html-icon.png";
    case "js":
      return "../../src/assets/images/js-icon.png";
    case "css":
      return "../../src/assets/images/css-icon.png";
    case "json":
      return "../../src/assets/images/json-icon.png";
    case "xml":
      return "../../src/assets/images/xml-icon.png";
    case "txt":
      return "../../src/assets/images/txt-icon.png";
    case "md":
      return "../../src/assets/images/markdown-icon.png";  // Markdown files
    case "ts":
      return "../../src/assets/images/typescript-icon.png"; // TypeScript
    case "jsx":
      return "../../src/assets/images/jsx-icon.png"; // JSX files
    case "tsx":
      return "../../src/assets/images/jsx-icon.png"; // TSX files. Uses the same icon
    case "py":
      return "../../src/assets/images/py-icon.webp"; // Python
    case "java":
      return "../../src/assets/images/java-icon.png"; // Java
    case "c":
      return "../../src/assets/images/c-icon.png"; // C programming language
    case "cpp":
      return "../../src/assets/images/cpp-icon.png"; // C++ programming language
    case "cs":
      return "../../src/assets/images/cs-icon.png"
    case "php":
      return "../../src/assets/images/php-icon.png"; // PHP
    case "go":
    case "mod":
    case "sum":
      return "../../src/assets/images/go-icon.png"; // Go
    case "rb":
      return "../../src/assets/images/ruby-icon.png"; // Ruby
    case "swift":
      return "../../src/assets/images/swift-icon.webp"; // Swift
    case "rs":
      return "../../src/assets/images/rust-icon.png"

    // Image files
    case "jpg":
    case "jpeg":
      return "../../src/assets/images/jpg-icon.webp";
    case "png":
      return "../../src/assets/images/png-icon.webp";
    case "gif":
      return "../../src/assets/images/gif-icon.png";
    case "bmp":
      return "../../src/assets/images/bmp-icon.png";
    case "webp":
      return "../../src/assets/images/webp-icon.png";

    // Audio files
    case "mp3":
      return "../../src/assets/images/auio-icon.webp";
    case "wav":
      return "../../src/assets/images/audio-icon.webp";
    case "ogg":
      return "../../src/assets/images/audio-icon.webp";
    case "aac":
      return "../../src/assets/images/audio-icon.webp";

    // Video files
    case "mp4":
      return "../../src/assets/images/mp4-icon.png";
    case "avi":
      return "../../src/assets/images/avi-icon.png";
    case "mkv":
      return "../../src/assets/images/mkv-icon.png";
    case "mov":
      return "../../src/assets/images/mov-icon.png";

    // Document files
    case "pdf":
      return "../../src/assets/images/pdf-icon.webp";
    case "doc":
    case "docx":
      return "../../src/assets/images/doc-icon.png";
    case "ppt":
    case "pptx":
      return "../../src/assets/images/ppt-icon.png";
    case "xls":
    case "xlsx":
      return "../../src/assets/images/xls-icon.png";

    // Archive files
    case "zip":
      return "../../src/assets/images/zip-icon.png";
    case "tar":
      return "../../src/assets/images/tar-icon.png";
    case "rar":
      return "../../src/assets/images/rar-icon.png";
    case "7z":
      return "../../src/assets/images/7z-icon.png";

    // Miscellaneous
    case "exe":
      return "../../src/assets/images/exe-icon.png"; // Executable files
    case "app":
      return "../../src/assets/images/app-icon.png"; // Application files
    case "bat":
      return "../../src/assets/images/bat-icon.png"; // Batch files
    case "sh":
      return "../../src/assets/images/sh-icon.png"; // Shell script files

    default:
      return "../../src/assets/images/default-file-icon.jpg"
  }
}

export default returnImgPath