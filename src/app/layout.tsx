import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme';
import ReactQueryProvider from '@/react-query';

const manrope = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Opal',
	description: 'Share AI powered videos with your friends',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${manrope.className} bg-[#171717]`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						disableTransitionOnChange
					>
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
