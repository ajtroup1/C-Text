import { useEffect, useState } from 'react';

export function useResizer(
  browserRef: React.RefObject<HTMLDivElement>,
  editorRef: React.RefObject<HTMLDivElement>,
  resizerRef: React.RefObject<HTMLDivElement>,
  lowerMainRef: React.RefObject<HTMLDivElement>
) {
  const [isDragging, setIsDragging] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(0);
  const [editorWidth, setEditorWidth] = useState(0);

  useEffect(() => {
    const resizer = resizerRef.current;
    const editor = editorRef.current;
    const browser = browserRef.current;
    const lowerMain = lowerMainRef.current;

    if (!resizer || !editor || !browser || !lowerMain) {
      console.error('Required elements are missing from the DOM');
      return;
    }

    const totalWidth = lowerMain.offsetWidth;
    const initialBrowserWidth = totalWidth * 0.30; 
    const initialEditorWidth = totalWidth - initialBrowserWidth - resizer.offsetWidth;

    if (browser && editor && browserWidth === 0 && editorWidth === 0) {
      browser.style.flexBasis = `${initialBrowserWidth}px`;
      editor.style.flexBasis = `${initialEditorWidth}px`;

      setBrowserWidth(initialBrowserWidth);
      setEditorWidth(initialEditorWidth);
    }

    const handleMouseDown = () => {
      setIsDragging(true);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const offsetX = e.clientX;
      const totalWidth = lowerMain.offsetWidth;

      const newBrowserWidth = Math.max(150, offsetX);
      const newEditorWidth = Math.max(150, totalWidth - newBrowserWidth - resizer.offsetWidth);

      if (browser) browser.style.flexBasis = `${newBrowserWidth}px`;
      if (editor) editor.style.flexBasis = `${newEditorWidth}px`;

      setBrowserWidth(newBrowserWidth);
      setEditorWidth(newEditorWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    resizer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, browserRef, editorRef, resizerRef, lowerMainRef, browserWidth, editorWidth]);

  return { browserWidth, editorWidth };
}
