
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a meta tag to prevent caching
const metaTag = document.createElement('meta');
metaTag.httpEquiv = 'Cache-Control';
metaTag.content = 'no-cache, no-store, must-revalidate';
document.head.appendChild(metaTag);

// Add a pragma header
const pragmaTag = document.createElement('meta');
pragmaTag.httpEquiv = 'Pragma';
pragmaTag.content = 'no-cache';
document.head.appendChild(pragmaTag);

// Add expiry header
const expiresTag = document.createElement('meta');
expiresTag.httpEquiv = 'Expires';
expiresTag.content = '0';
document.head.appendChild(expiresTag);

createRoot(document.getElementById("root")!).render(<App />);
