import './globals.css';

export const metadata = {
    title: 'Fermor — Your money deserves a clearer view',
    description: 'Understand, plan and grow your money in plain English.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}