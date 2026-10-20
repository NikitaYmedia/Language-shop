import { Manrope, Source_Serif_4, Caveat } from 'next/font/google';
import './globals.css';

const sans = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-sans',
  display: 'swap',
});
const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const script = Caveat({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  title: 'Dansk — Danish language tutor',
  description:
    'Danish for life, study and career. Online lessons with Anna: conversation, grammar, exam preparation and Danish for work.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
