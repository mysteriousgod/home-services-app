import { Providers } from './providers'
import ClientLayout from '@/components/ClientLayout'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}