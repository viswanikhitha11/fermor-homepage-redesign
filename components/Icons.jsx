const IP = {
    home: (
        <>
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
            <path d="M10 20v-6h4v6" />
        </>
    ),

    wealth: (
        <>
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </>
    ),

    family: (
        <>
            <circle cx="9" cy="8" r="3" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M17 14c2.5 0 4.5 2 4.5 4.5" />
        </>
    ),

    edu: (
        <>
            <path d="M2 9l10-5 10 5-10 5z" />
            <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
            <path d="M22 9v6" />
        </>
    ),

    ret: (
        <>
            <path d="M3 18h18" />
            <path d="M6 18a6 6 0 0112 0" />
            <path d="M12 6v3M4.5 10.5l2 2M19.5 10.5l-2-2" />
            <path d="M7 21h10" />
        </>
    ),

    invest: (
        <>
            <path d="M5 20v-7M12 20V5M19 20v-10" />
            <path d="M3 20h18" />
        </>
    ),

    savings: (
        <>
            <rect x="3" y="6" width="18" height="13" rx="2.5" />
            <path d="M3 10h18" />
            <circle cx="16.5" cy="14.5" r="1" />
        </>
    ),

    shield: (
        <>
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
            <path d="M9 12l2 2 4-4" />
        </>
    ),

    bank: (
        <>
            <path d="M3 10l9-6 9 6" />
            <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
            <path d="M3 20h18" />
        </>
    ),

    goal: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" />
        </>
    ),

    pin: (
        <>
            <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </>
    ),

    up: (
        <>
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
        </>
    ),

    sun: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
    ),

    moon: (
        <>
            <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
        </>
    ),

    close: (
        <>
            <path d="M6 6l12 12M18 6L6 18" />
        </>
    ),

    menu: (
        <>
            <path d="M4 8h16M4 16h16" />
        </>
    )
};

export function Ico({ k }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {IP[k]}
        </svg>
    );
}