import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './styles.css';
import { ReportDocument } from './App';
import { microTutorialsAi } from './data/micro-tutorials-ai';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportDocument data={microTutorialsAi} />
  </StrictMode>,
);
