'use client'

import { useEffect, useRef, useState } from 'react'
import { Ico } from './Icons'

export const inr = n =>
    n >= 1e7
        ? '₹' + (n / 1e7).toFixed(2) + ' Cr'
        : n >= 1e5
        ? '₹' + (n / 1e5).toFixed(1) + 'L'
        : '₹' + Math.round(n).toLocaleString('en-IN')

export function Reveal({
    id,
    className = '',
    children
}) {
    const ref = useRef(null)
    const [seen, set] = useState(false)

    useEffect(() => {
        const o = new IntersectionObserver(
            ([e]) => e.isIntersecting && set(true),
            { threshold: 0.15 }
        )

        ref.current && o.observe(ref.current)

        return () => o.disconnect()
    }, [])

    return (
        <section
            id={id}
            ref={ref}
            className={`rv ${seen ? 'in' : ''} ${className}`}
        >
            {typeof children === 'function'
                ? children(seen)
                : children}
        </section>
    )
}

export function Count({
    to,
    f = inr,
    go = true
}) {
    const [v, setV] = useState(0)
    const pr = useRef(0)

    useEffect(() => {
        if (!go) return

        if (
            matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
        ) {
            pr.current = to
            setV(to)
            return
        }

        const from = pr.current
        let start
        let id

        const tick = ts => {
            start = start || ts

            const p = Math.min(
                (ts - start) / 900,
                1
            )

            const x =
                from +
                (to - from) *
                    (1 - Math.pow(1 - p, 3))

            pr.current = x
            setV(x)

            if (p < 1) {
                id = requestAnimationFrame(tick)
            }
        }

        id = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(id)
    }, [to, go])

    return f(v)
}

export function Logo() {
    return (
        <span
            className="logo"
            aria-label="Fermor"
        >
            <img
                src="/logo.png"
                alt=""
                className="lg"
            />

            <span className="wm2">
                ferm
                <span
                    className="od"
                    aria-hidden="true"
                />
                r
            </span>
        </span>
    )
}

const LINKS = [
    ['Explore', '#snapshot'],
    ['Goals', '#goals'],
    ['Tools', '#tools'],
    ['Learn', '#insights']
]

export function Nav() {
    const [s, setS] = useState(false)
    const [act, setAct] = useState('')
    const [o, setO] = useState(false)
    const [dark, setD] = useState(false)

    useEffect(() => {
        setD(
            matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
        )

        const f = () => {
            setS(scrollY > 40)

            const a = LINKS.find(([, h]) => {
                const r =
                    document
                        .querySelector(h)
                        ?.getBoundingClientRect()

                return (
                    r &&
                    r.top < innerHeight * 0.4 &&
                    r.bottom > 0
                )
            })

            setAct(a ? a[1] : '')
        }

        f()

        addEventListener('scroll', f, {
            passive: true
        })

        return () =>
            removeEventListener('scroll', f)
    }, [])

    const tog = () => {
        document.documentElement.dataset.theme =
            dark ? 'light' : 'dark'

        setD(!dark)
    }

    return (
        <nav className={s ? 's' : ''}>
            <div className="nb">
                <Logo />

                <div className="links">
                    {LINKS.map(([n, h]) => (
                        <a
                            key={h}
                            href={h}
                            className={
                                act === h ? 'on' : ''
                            }
                        >
                            {n}
                        </a>
                    ))}
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 8
                    }}
                >
                    <button
                        className="ic2"
                        onClick={tog}
                        aria-label="Toggle theme"
                    >
                        <Ico
                            k={
                                dark
                                    ? 'sun'
                                    : 'moon'
                            }
                        />
                    </button>

                    <a href="#goals">
                        <button className="btn">
                            Get Started{' '}
                            <span className="ar">
                                →
                            </span>
                        </button>
                    </a>

                    <button
                        className="ic2 burger"
                        onClick={() => setO(!o)}
                        aria-label="Menu"
                    >
                        <Ico
                            k={
                                o
                                    ? 'close'
                                    : 'menu'
                            }
                        />
                    </button>
                </div>
            </div>

            <div
                className={`mm ${
                    o ? 'open' : ''
                }`}
            >
                {LINKS.map(([n, h]) => (
                    <a
                        key={h}
                        href={h}
                        onClick={() => setO(false)}
                    >
                        {n}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export function Hero() {
    const ref = useRef(null)
    const rm = useRef(false)

    useEffect(() => {
        rm.current = matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        const f = () =>
            ref.current?.style.setProperty(
                '--p',
                Math.min(scrollY / 500, 1)
            )

        addEventListener('scroll', f, {
            passive: true
        })

        return () =>
            removeEventListener('scroll', f)
    }, [])

    const mv = e => {
        if (rm.current) return

        const r =
            e.currentTarget.getBoundingClientRect()

        ref.current.style.setProperty(
            '--mx',
            ((e.clientX - r.left) / r.width - 0.5) *
                2
        )

        ref.current.style.setProperty(
            '--my',
            ((e.clientY - r.top) / r.height - 0.5) *
                2
        )
    }

    const lv = () => {
        ref.current.style.setProperty('--mx', 0)
        ref.current.style.setProperty('--my', 0)
    }

    return (
        <header
            className="hero"
            ref={ref}
            onMouseMove={mv}
            onMouseLeave={lv}
        >
            <div>
                <span className="badge">
                    <Ico k="pin" />
                    Built for India
                </span>

                <span className="eyebrow">
                    Understand • Plan • Grow
                </span>

                <h1>
                    Your money deserves a{' '}
                    <em>clearer</em> view.
                </h1>

                <p>
                    Fermor turns net worth, goals and
                    investing into one calm picture —
                    in plain English, built for India.
                </p>

                <a href="#snapshot">
                    <button className="btn">
                        Start exploring{' '}
                        <span className="ar">
                            →
                        </span>
                    </button>
                </a>
            </div>

            <div className="stage">
                <div
                    className="px"
                    style={{ '--d': -6 }}
                >
                    <div className="hgrid" />
                </div>

                <div
                    className="px"
                    style={{ '--d': 14 }}
                >
                    <div className="glow" />
                </div>

                <div
                    className="px"
                    style={{ '--d': -10 }}
                >
                    <div className="globe" />
                </div>

                <div
                    className="px"
                    style={{ '--d': 30 }}
                >
                    <div className="fl coin big">
                        ₹
                    </div>

                    <div
                        className="fl coin sm"
                        style={{
                            animationDelay: '-3s'
                        }}
                    >
                        ₹
                    </div>
                </div>

                <div
                    className="px"
                    style={{ '--d': 8 }}
                >
                    <div className="pw">
                        <div className="fl phone">
                            <i className="notch" />

                            <div className="ph-h">
                                <span>
                                    Net worth
                                </span>

                                <em>
                                    <Ico k="up" /> 8.2%
                                </em>
                            </div>

                            <strong>
                                <Count
                                    to={4264200}
                                    f={n =>
                                        '₹' +
                                        (
                                            n / 1e5
                                        ).toFixed(1) +
                                        'L'
                                    }
                                />
                            </strong>

                            <svg
                                viewBox="0 0 100 36"
                                className="ph-c"
                            >
                                <defs>
                                    <linearGradient
                                        id="pg"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0"
                                            stopColor="#B5EB6B"
                                            stopOpacity=".5"
                                        />

                                        <stop
                                            offset="1"
                                            stopColor="#B5EB6B"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>

                                <path
                                    d="M0 30 L15 26 L30 28 L48 18 L65 20 L82 9 L100 4 V36 H0Z"
                                    fill="url(#pg)"
                                />

                                <polyline
                                    points="0,30 15,26 30,28 48,18 65,20 82,9 100,4"
                                    fill="none"
                                    stroke="#B5EB6B"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    pathLength="1"
                                    strokeDasharray="1"
                                    style={{
                                        animation:
                                            'dr 2s ease-out'
                                    }}
                                />
                            </svg>

                            <div className="alloc">
                                <i
                                    style={{
                                        width: '57%'
                                    }}
                                />

                                <i
                                    style={{
                                        width: '16%'
                                    }}
                                />

                                <i
                                    style={{
                                        width: '22%'
                                    }}
                                />
                            </div>

                            <div className="ph-r">
                                <span>
                                    <Ico k="invest" />
                                    Investments
                                </span>
                                <b>₹24.1L</b>
                            </div>

                            <div className="ph-r">
                                <span>
                                    <Ico k="savings" />
                                    Savings
                                </span>
                                <b>₹6.8L</b>
                            </div>

                            <div className="ph-r">
                                <span>
                                    <Ico k="home" />
                                    Home goal
                                </span>
                                <b>68%</b>
                            </div>

                            <div className="mini">
                                <span
                                    style={{
                                        width: '68%'
                                    }}
                                />
                            </div>

                            <div className="ph-r">
                                <span>
                                    <Ico k="shield" />
                                    Health
                                </span>
                                <b>78/100</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="px"
                    style={{ '--d': 46 }}
                >
                    <div className="fl chip c1">
                        <Ico k="invest" />
                        Investments
                        <b>₹24.1L</b>
                        <small>+12.4% p.a.</small>
                    </div>

                    <div
                        className="fl chip c2"
                        style={{
                            animationDelay: '-3s'
                        }}
                    >
                        <Ico k="home" />
                        Home goal
                        <b>68%</b>
                        <small>on track</small>
                    </div>

                    <div
                        className="fl chip c3"
                        style={{
                            animationDelay: '-4s'
                        }}
                    >
                        <Ico k="shield" />
                        Health
                        <b>78/100</b>
                        <small>Good</small>
                    </div>

                    <div
                        className="fl chip c4"
                        style={{
                            animationDelay: '-2s'
                        }}
                    >
                        <Ico k="pin" />
                        Built for India
                    </div>
                </div>
            </div>
        </header>
    )
}

export function Footer() {
    return (
        <footer>
            <div>
                <Logo />
                <span>
                    Understand. Plan. Grow.
                </span>
                <span>Built for India</span>
            </div>

            {[
                ['Explore', 'Tools', 'Goals'],
                ['Learn', 'Guides', 'Insights'],
                ['Company', 'About', 'Contact']
            ].map(([h, ...r]) => (
                <div key={h}>
                    <b>{h}</b>

                    {r.map(x => (
                        <span key={x}>
                            {x}
                        </span>
                    ))}
                </div>
            ))}

            <div
                style={{
                    width: '100%',
                    opacity: 0.7
                }}
            >
                © 2026 Fermor concept redesign ·
                Educational use only, not financial advice.
            </div>
        </footer>
    )
}