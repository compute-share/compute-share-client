import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AuthProvider } from '@/app/hooks/useAuth';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} antialiased`} >{children}</body>
      </AuthProvider>
    </html>
  );
}
