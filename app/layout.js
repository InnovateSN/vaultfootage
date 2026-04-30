import './globals.css';

export const metadata = {
  title: 'TamaSocial',
  description: 'A living digital pet social world inside a Tamagotchi-inspired device.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
