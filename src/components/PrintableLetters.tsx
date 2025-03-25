
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { formatScrambledLetters } from '../utils/printUtils';

interface PrintableLettersProps {
  contentType: 'scramble' | 'cipher' | 'facilitator';
  content: string;
  title?: string;
  description?: string;
}

const PrintableLetters: React.FC<PrintableLettersProps> = ({ 
  contentType, 
  content,
  title = '',
  description = ''
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default navigation
    const contentElement = printRef.current;
    if (!contentElement) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print content');
      return;
    }

    // Create title based on content type
    const printTitle = title || (contentType === 'scramble' 
      ? `Printable Letters for "${content}"`
      : contentType === 'cipher'
      ? `Printable Cipher`
      : "Printable Materials");

    // Create print-friendly content
    printWindow.document.write(`
      <html>
        <head>
          <title>${printTitle}</title>
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
            .chart-container {
              border: 2px solid #000;
              padding: 30px;
              margin: 20px auto;
              max-width: 800px;
            }
            .chart-title {
              font-size: 28px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 20px;
              text-transform: uppercase;
            }
            .chart-description {
              font-size: 16px;
              margin-bottom: 30px;
              text-align: justify;
            }
            .chart-content {
              font-size: 18px;
              line-height: 1.6;
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
            <h1>${printTitle}</h1>
            ${contentType === 'scramble' 
              ? '<p>Cut out these letters and use them for your escape room word challenge.</p>' 
              : contentType === 'cipher'
              ? '<p>Print this cipher to use in your escape room challenge.</p>'
              : '<p>Print these materials for your escape room challenge.</p>'
            }
            <button class="no-print" onclick="window.print()">Print This Page</button>
          </div>
          ${contentType === 'scramble' 
            ? `<div class="print-container">
                ${formatScrambledLetters(content).map(letter => 
                  `<div class="letter">${letter}</div>`
                ).join('')}
              </div>` 
            : contentType === 'cipher'
            ? `<div class="cipher-container">
                <div class="cipher-text">${content}</div>
              </div>`
            : `<div class="chart-container">
                <div class="chart-title">${title}</div>
                <div class="chart-description">${description}</div>
                <div class="chart-content">
                  ${formatFacilitatorContent(description)}
                </div>
              </div>`
          }
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  // Helper function to format facilitator content into a nice chart
  const formatFacilitatorContent = (text: string) => {
    if (!text) return '';
    
    // Look for lists like "1. Item" or "- Item"
    const listItems = text.match(/(\d+\.\s[^.]+\.)|(-\s[^.]+\.)/g);
    
    if (listItems && listItems.length > 0) {
      return `<ul style="list-style-type: none; padding: 0;">
        ${listItems.map(item => 
          `<li style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            ${item.trim()}
          </li>`
        ).join('')}
      </ul>`;
    }
    
    // If no list items found, try to extract important information
    const sentences = text.split('.');
    return `<ul style="list-style-type: none; padding: 0;">
      ${sentences.filter(s => s.trim().length > 10).map(sentence => 
        `<li style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
          ${sentence.trim()}.
        </li>`
      ).join('')}
    </ul>`;
  };

  const getButtonLabel = () => {
    switch (contentType) {
      case 'scramble': 
        return 'Print Letters';
      case 'cipher': 
        return 'Print Cipher';
      case 'facilitator': 
        return 'Print Chart';
      default: 
        return 'Print Materials';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" /> 
          {getButtonLabel()}
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
        ) : contentType === 'cipher' ? (
          // Cipher text display - ensure the complete message is shown
          <div className="w-full font-mono text-lg p-2 bg-white border border-gray-300 rounded-md break-words">
            {content}
          </div>
        ) : (
          // Facilitator chart preview
          <div className="w-full p-2 bg-white border border-gray-300 rounded-md">
            <h3 className="font-bold text-lg text-center mb-2">{title || 'Printable Chart'}</h3>
            <p className="text-sm italic">{description.substring(0, 100)}...</p>
            <p className="text-xs text-gray-500 mt-2 text-center">Click "Print Chart" to see the complete formatted chart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintableLetters;
