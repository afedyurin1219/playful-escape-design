
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { formatScrambledLetters } from '../utils/printUtils';

interface PrintableLettersProps {
  contentType: 'scramble' | 'cipher';
  content: string;
}

const PrintableLetters: React.FC<PrintableLettersProps> = ({ contentType, content }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = (e: React.MouseEvent) => {
    // Prevent the default navigation behavior
    e.preventDefault();
    
    const contentElement = printRef.current;
    if (!contentElement) return;

    // Create a new window without navigation
    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      alert('Please allow pop-ups to print content');
      return;
    }

    // Create title based on content type
    const title = contentType === 'scramble' 
      ? `Printable Letters for "${content}"`
      : `Printable Cipher: "${content}"`;

    // Create print-friendly content
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .print-container {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              justify-content: center;
            }
            .letter {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 120px;
              font-size: 72px;
              font-weight: bold;
              border: 2px solid #000;
              margin: 10px;
              page-break-inside: avoid;
            }
            .cipher-container {
              border: 2px solid #000;
              padding: 40px;
              text-align: center;
              margin: 20px auto;
              max-width: 600px;
            }
            .cipher-text {
              font-size: 36px;
              font-weight: bold;
              font-family: monospace;
              line-height: 1.5;
              letter-spacing: 2px;
            }
            .instructions {
              margin-bottom: 30px;
              text-align: center;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="instructions">
            <h1>${title}</h1>
            ${contentType === 'scramble' 
              ? '<p>Cut out these letters and use them for your escape room word challenge.</p>' 
              : '<p>Print this cipher to use in your escape room challenge.</p>'
            }
            <button class="no-print" onclick="window.print()">Print This Page</button>
          </div>
          ${contentType === 'scramble' 
            ? `<div class="print-container">
                ${formatScrambledLetters(content).map(letter => 
                  `<div class="letter">${letter}</div>`
                ).join('')}
              </div>` 
            : `<div class="cipher-container">
                <div class="cipher-text">${content}</div>
              </div>`
          }
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-medium">Printable Content</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" /> 
          {contentType === 'scramble' ? 'Print Letters' : 'Print Cipher'}
        </Button>
      </div>
      
      <div 
        ref={printRef} 
        className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-md border border-gray-200"
      >
        {contentType === 'scramble' ? (
          // Scrambled letters display
          formatScrambledLetters(content).map((letter, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center w-10 h-12 bg-white font-bold text-xl border border-gray-300 rounded-md shadow-sm"
            >
              {letter}
            </div>
          ))
        ) : (
          // Cipher text display
          <div className="w-full font-mono text-lg p-2 bg-white border border-gray-300 rounded-md">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintableLetters;
