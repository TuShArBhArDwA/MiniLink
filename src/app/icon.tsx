import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #8b5cf6, #ec4899)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                }}
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        display: 'block',
                    }}
                >
                    <path d="M9 17H7A5 5 0 0 1 7 7H9" />
                    <path d="M15 7H17A5 5 0 0 1 17 17H15" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
