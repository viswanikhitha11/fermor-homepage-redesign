'use client'

import { useState, useEffect } from 'react'
import { Reveal, Count, inr } from './Shell'
import { Ico } from './Icons'

const fv = (P, r, n) => {
    r = r / 1200
    n *= 12
    return P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

function Sl({ l, v, set, min, max, step = 1, f = x => x }) {
    return (
        <>
            <label>
                {l}
                <b>{f(v)}</b>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={v}
                onChange={e => set(+e.target.value)}
            />
        </>
    )
}

const ASSETS = [
    ['Investments', 24.1],
    ['Savings', 6.8],
    ['Retirement', 9.2],
    ['Other', 2.5]
]

const GOALS = [
    [
        'home',
        'Home',
        62e5 * 10,
        10,
        0.68,
        'linear-gradient(135deg,#0D1709,#5E9E2A)'
    ],
    [
        'wealth',
        'Wealth',
        12e6,
        15,
        0.31,
        'linear-gradient(135deg,#1a2b10,#6FB33A)'
    ],
    [
        'family',
        'Family',
        18e5 * 10,
        6,
        0.4,
        'linear-gradient(135deg,#5E9E2A,#0D1709)'
    ],
    [
        'edu',
        'Education',
        28e5 * 10,
        8,
        0.42,
        'linear-gradient(135deg,#0D1709,#4F8A1E)'
    ],
    [
        'ret',
        'Retirement',
        123e5 * 10,
        20,
        0.31,
        'linear-gradient(135deg,#2F5412,#0D1709)'
    ]
]

export function Snapshot() {
    return (
        <Reveal id="snapshot">
            {seen => (
                <>
                    <span className="eyebrow">
                        Your money at a glance
                    </span>

                    <h2>One picture. Everything connected.</h2>

                    <div className="snap">
                        {[
                            ['Net worth', 4264200, '+8.2% this year'],
                            ['Investments', 2410000, '+12.4%'],
                            ['Savings', 680000, '5 months cover'],
                            ['Goals on track', 68, 'avg progress']
                        ].map(([l, v, s], i) => (
                            <div key={l}>
                                <small className="lb">
                                    <Ico
                                        k={[
                                            'wealth',
                                            'invest',
                                            'savings',
                                            'goal'
                                        ][i]}
                                    />
                                    {l}
                                </small>

                                <b>
                                    {seen && (
                                        <Count
                                            to={v}
                                            f={
                                                i === 3
                                                    ? n => Math.round(n) + '%'
                                                    : inr
                                            }
                                        />
                                    )}
                                </b>

                                <small>{s}</small>
                            </div>
                        ))}
                    </div>

                    <div className="grid2">
                        <div className="panel">
                            <b>Assets</b>

                            {ASSETS.map(([n, v]) => (
                                <div className="meter" key={n}>
                                    <div>
                                        <span>{n}</span>
                                        <b>₹{v}L</b>
                                    </div>

                                    <div className="bar big-bar">
                                        <i
                                            style={{
                                                width: seen
                                                    ? v / 24.1 * 100 + '%'
                                                    : 0
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="panel">
                            <b>Goals</b>

                            {GOALS.slice(0, 3).map(g => (
                                <div className="meter" key={g[1]}>
                                    <div>
                                        <span>{g[1]}</span>
                                        <b>{Math.round(g[4] * 100)}%</b>
                                    </div>

                                    <div className="bar big-bar">
                                        <i
                                            style={{
                                                width: seen
                                                    ? g[4] * 100 + '%'
                                                    : 0
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </Reveal>
    )
}

const HD = [
    ['Savings', 90, 'Strong'],
    ['Debt', 82, 'Healthy'],
    ['Protection', 61, 'Review'],
    ['Investing', 79, 'On track']
]

const HI = {
    Savings: 'Your savings cover about 5 months. Healthy.',
    Debt: 'Your debt is manageable. Prepaying a small loan frees up cash.',
    Protection:
        'Your savings are healthy, but your protection could improve.',
    Investing:
        'Strong habit. A little more equity could lift long-term growth.'
}

export function Health() {
    const [open, setOpen] = useState(false)
    const [hl, setHl] = useState(null)

    useEffect(() => {
        setOpen(matchMedia('(min-width:761px)').matches)
    }, [])

    const score = Math.round(
        HD.reduce((a, d) => a + d[1], 0) / HD.length
    )

    const low = HD.reduce((a, d) => (d[1] < a[1] ? d : a))

    return (
        <Reveal id="health">
            {seen => (
                <>
                    <span className="eyebrow">
                        <Ico k="shield" />
                        Financial health check
                    </span>

                    <h2>One score. Four things that move it.</h2>

                    <div className="panel hc">
                        <div className="hc-score">
                            <button
                                className="ringbtn"
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                aria-label="Toggle health breakdown"
                            >
                                <svg
                                    className="ring"
                                    viewBox="0 0 120 120"
                                >
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="52"
                                        fill="none"
                                        stroke="var(--line)"
                                        strokeWidth="10"
                                    />

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="52"
                                        fill="none"
                                        stroke="var(--green)"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray="327"
                                        strokeDashoffset={
                                            seen
                                                ? 327 * (1 - score / 100)
                                                : 327
                                        }
                                        transform="rotate(-90 60 60)"
                                        style={{
                                            transition:
                                                'stroke-dashoffset 1.4s'
                                        }}
                                    />

                                    <text
                                        x="60"
                                        y="66"
                                        textAnchor="middle"
                                        style={{ fontSize: 32 }}
                                    >
                                        {score}
                                    </text>

                                    <text
                                        x="60"
                                        y="82"
                                        textAnchor="middle"
                                        style={{
                                            fontSize: 10,
                                            fontFamily: 'system-ui'
                                        }}
                                    >
                                        /100
                                    </text>
                                </svg>
                            </button>

                            <p className="lbl">
                                Good · room to improve
                            </p>

                            <button
                                className={`cue ${open ? 'o' : ''}`}
                                onClick={() => setOpen(!open)}
                            >
                                {open
                                    ? 'Hide breakdown ↑'
                                    : 'Tap to explore →'}
                            </button>
                        </div>

                        <div className={`bd ${open ? 'open' : ''}`}>
                            <div>
                                {HD.map(([n, v, t], i) => (
                                    <div
                                        className={`hrow ${
                                            v < 70 ? 'warn' : ''
                                        } ${hl === n ? 'hl' : ''}`}
                                        key={n}
                                        onMouseEnter={() => setHl(n)}
                                        onMouseLeave={() => setHl(null)}
                                        onClick={() => setHl(n)}
                                    >
                                        <span>{n}</span>

                                        <b>
                                            {v} <em>{t}</em>
                                        </b>

                                        <div className="bar">
                                            <i
                                                style={{
                                                    width: open ? v + '%' : 0,
                                                    transitionDelay: open
                                                        ? i * 80 + 'ms'
                                                        : '0ms'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="ins">
                                    <small>
                                        {hl
                                            ? hl
                                            : 'Your biggest opportunity: ' +
                                              low[0]}
                                    </small>
                                    <br />
                                    {HI[hl || low[0]]}
                                </div>

                                <button
                                    className="hm"
                                    onClick={() => setOpen(false)}
                                >
                                    Hide breakdown ↑
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Reveal>
    )
}

const F = 'rgba(149,204,62,.14)'

const IL = {
    home: (
        <>
            <path d="M20 128h160" />
            <path
                d="M62 128V84l38-32 38 32v44"
                fill={F}
            />
            <path d="M52 88l48-40 48 40" />
            <rect x="90" y="100" width="20" height="28" />
            <rect x="70" y="92" width="12" height="12" />
            <rect x="118" y="92" width="12" height="12" />
            <path d="M122 62V48h10v22" />
            <circle
                cx="100"
                cy="80"
                r="52"
                strokeDasharray="2 5"
                opacity=".45"
            />
        </>
    ),

    wealth: (
        <>
            <path d="M24 24v104h156" />
            <path
                d="M24 128l0 0M24 112h156M24 88h156M24 64h156"
                opacity=".18"
            />
            <path
                d="M24 118C62 116 78 98 106 78s54-38 74-50V128H24z"
                fill={F}
                stroke="none"
            />
            <path d="M24 118C62 116 78 98 106 78s54-38 74-50" />
            <circle
                cx="180"
                cy="28"
                r="4"
                fill="var(--mint)"
            />
            <path
                d="M48 128v-10M80 128v-20M112 128v-34M144 128v-52"
                opacity=".5"
            />
        </>
    ),

    family: (
        <>
            <circle cx="72" cy="62" r="14" fill={F} />
            <circle cx="128" cy="62" r="14" fill={F} />
            <circle cx="100" cy="98" r="10" fill={F} />
            <path d="M48 124c0-14 10-24 24-24s24 10 24 24" />
            <path d="M104 124c0-14 10-24 24-24s24 10 24 24" />
            <path
                d="M86 62h28M78 76l16 14M122 76l-16 14"
                strokeDasharray="2 4"
                opacity=".6"
            />
            <circle
                cx="100"
                cy="80"
                r="62"
                strokeDasharray="2 5"
                opacity=".35"
            />
        </>
    ),

    edu: (
        <>
            <path
                d="M100 64C80 54 54 54 34 62v62c20-8 46-8 66 2 20-10 46-10 66-2V62c-20-8-46-8-66 2z"
                fill={F}
            />
            <path d="M100 64v62" />
            <path d="M62 38l38-14 38 14-38 14z" />
            <path d="M138 38v14" />
            <path
                d="M50 78c14-3 28-3 40 2M50 92c14-3 28-3 40 2M110 80c12-5 26-5 40-2M110 94c12-5 26-5 40-2"
                opacity=".45"
            />
        </>
    ),

    ret: (
        <>
            <path d="M20 112h160" />
            <path
                d="M62 112a38 38 0 0176 0z"
                fill={F}
            />
            <path
                d="M100 54v-14M56 70l-10-10M144 70l10-10M36 94H22M178 94h-14"
            />
            <path
                d="M50 126h100M72 138h56"
                opacity=".55"
            />
            <circle
                cx="100"
                cy="112"
                r="58"
                strokeDasharray="2 5"
                opacity=".35"
            />
        </>
    )
}

function Illus({ cur }) {
    return (
        <div className="ills" aria-hidden="true">
            {Object.keys(IL).map(k => (
                <svg
                    key={k}
                    className={`il ${k === cur ? 'on' : ''}`}
                    viewBox="0 0 200 160"
                    fill="none"
                    stroke="var(--mint)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {IL[k]}
                </svg>
            ))}
        </div>
    )
}

export function Goals() {
    const [i, setI] = useState(0)
    const [ov, setOv] = useState(
        GOALS.map(g => [g[2], g[3]])
    )

    const g = GOALS[i]
    const [T, Y] = ov[i]

    const set = (k, v) =>
        setOv(o =>
            o.map((x, j) =>
                j === i
                    ? k
                        ? [x[0], v]
                        : [v, x[1]]
                    : x
            )
        )

    const monthly =
        T * (1 - g[4]) / fv(1, 12, Y) * 1

    return (
        <Reveal id="goals">
            <span className="eyebrow">
                What are you planning?
            </span>

            <h2>Pick a goal. Watch the plan reshape.</h2>

            <div className="goals">
                {GOALS.map((x, k) => (
                    <button
                        key={x[1]}
                        className={`pill gp ${k === i ? 'on' : ''}`}
                        onClick={() => setI(k)}
                        aria-pressed={k === i}
                    >
                        <Ico k={x[0]} />
                        <span>{x[1]}</span>
                    </button>
                ))}
            </div>

            <div className="grid2">
                <div
                    className="scene"
                    style={{ minHeight: 340 }}
                >
                    <Illus cur={g[0]} />

                    <div>
                        <h3>{inr(T)}</h3>
                        <p>
                            {g[1]} goal · {Y} years
                        </p>

                        <div
                            className="bar big-bar"
                            style={{
                                background:
                                    'rgba(255,255,255,.2)',
                                marginTop: 14
                            }}
                        >
                            <i
                                style={{
                                    width: g[4] * 100 + '%',
                                    background: 'var(--mint)'
                                }}
                            />
                        </div>

                        <p
                            style={{
                                marginTop: 6,
                                fontSize: 13
                            }}
                        >
                            {Math.round(g[4] * 100)}% saved
                        </p>

                        <div className="gtl">
                            {[
                                'Today',
                                'Year ' + Math.round(Y / 2),
                                'Year ' + Y
                            ].map((l, k) => (
                                <span
                                    key={l}
                                    className={
                                        k <= (g[4] > 0.5 ? 1 : 0)
                                            ? 'd'
                                            : ''
                                    }
                                >
                                    {l}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className="calc"
                    style={{ display: 'block' }}
                >
                    <small
                        style={{ color: 'var(--mint)' }}
                    >
                        Monthly investment needed
                    </small>

                    <output>
                        <Count to={monthly} />
                    </output>

                    <Sl
                        l="Target"
                        v={T}
                        set={v => set(0, v)}
                        min={5e5}
                        max={2e7}
                        step={1e5}
                        f={inr}
                    />

                    <Sl
                        l="Years"
                        v={Y}
                        set={v => set(1, v)}
                        min={1}
                        max={30}
                        f={x => x + ' yrs'}
                    />

                    <p className="note">
                        Assumes 12% p.a. on the remaining amount.
                        Illustrative only.
                    </p>
                </div>
            </div>
        </Reveal>
    )
}

const TOOLS = [
    [
        'SIP & Lumpsum',
        [
            ['Monthly', 1e4, 1e3, 1e5, 1e3, inr],
            ['Return', 12, 6, 18, 1, x => x + '%'],
            ['Years', 10, 1, 30, 1, x => x + ' yrs']
        ],
        ([p, r, y]) => [
            inr(fv(p, r, y)),
            'Estimated value · invested ' + inr(p * y * 12)
        ]
    ],

    [
        'EMI & Home Loan',
        [
            ['Loan', 5e6, 5e5, 2e7, 1e5, inr],
            ['Rate', 8.5, 6, 14, 0.1, x => x.toFixed(1) + '%'],
            ['Years', 20, 5, 30, 1, x => x + ' yrs']
        ],
        ([P, r, y]) => {
            const m = r / 1200
            const n = y * 12
            const e =
                P *
                m *
                Math.pow(1 + m, n) /
                (Math.pow(1 + m, n) - 1)

            return [
                inr(e) + '/mo',
                'Total interest ' + inr(e * n - P)
            ]
        }
    ],

    [
        'NPS / PPF / EPF',
        [
            ['Monthly', 2e4, 5e3, 1e5, 1e3, inr],
            [
                'Years to retire',
                25,
                5,
                35,
                1,
                x => x + ' yrs'
            ],
            ['Return', 10, 6, 15, 1, x => x + '%']
        ],
        ([p, y, r]) => [
            inr(fv(p, r, y)),
            'Projected corpus'
        ]
    ]
]

export function Tools() {
    const [t, setT] = useState(0)

    const [v, setV] = useState(
        TOOLS.map(x => x[1].map(s => s[1]))
    )

    const T = TOOLS[t]
    const [o, sub] = T[2](v[t])

    return (
        <Reveal id="tools">
            <span className="eyebrow">
                Money tools · Run the math.
            </span>

            <h2>Calculators that feel alive.</h2>

            <div className="tabs">
                {TOOLS.map((x, k) => (
                    <button
                        key={x[0]}
                        className={`pill tp ${k === t ? 'on' : ''}`}
                        onClick={() => setT(k)}
                    >
                        <Ico
                            k={['wealth', 'bank', 'ret'][k]}
                        />
                        {x[0]}
                    </button>
                ))}
            </div>

            <div className="calc">
                <div>
                    {T[1].map((s, k) => (
                        <Sl
                            key={s[0]}
                            l={s[0]}
                            v={v[t][k]}
                            min={s[2]}
                            max={s[3]}
                            step={s[4]}
                            f={s[5]}
                            set={n =>
                                setV(a =>
                                    a.map((r, j) =>
                                        j === t
                                            ? r.map((z, m) =>
                                                  m === k
                                                      ? n
                                                      : z
                                              )
                                            : r
                                    )
                                )
                            }
                        />
                    ))}
                </div>

                <div>
                    <small style={{ color: 'var(--mint)' }}>
                        {sub}
                    </small>

                    <output>{o}</output>

                    <p className="note">
                        Illustrative only. Actual returns vary.
                    </p>
                </div>
            </div>
        </Reveal>
    )
}

const INV = [
    [
        'Equity',
        'High growth, big swings.',
        85,
        12.4,
        '7+ years',
        'Long-term wealth creation'
    ],
    [
        'Balanced',
        'A mix of growth and stability.',
        55,
        10,
        '5+ years',
        'Steady, moderate growth'
    ],
    [
        'Gold',
        'A hedge when markets wobble.',
        45,
        8,
        '3–5 years',
        'Diversification'
    ],
    [
        'Debt',
        'Steady and predictable.',
        20,
        6.5,
        '1–3 years',
        'Capital stability'
    ]
]

export function Invest() {
    const [i, setI] = useState(0)
    const v = INV[i]

    return (
        <Reveal id="invest">
            <div className="grid2">
                <div>
                    <span className="eyebrow">
                        Invest
                    </span>

                    <h2>Where could your money go?</h2>

                    <div className="goals">
                        {INV.map((x, k) => (
                            <button
                                key={x[0]}
                                className={`pill ${
                                    k === i ? 'on' : ''
                                }`}
                                onClick={() => setI(k)}
                            >
                                {x[0]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h3 style={{ fontSize: 36 }}>
                        {v[0]}
                    </h3>

                    <p style={{ margin: '8px 0 16px' }}>
                        {v[1]}
                    </p>

                    <div className="meter">
                        <div>
                            <span>Potential return</span>
                            <b>~{v[3]}% p.a.</b>
                        </div>

                        <div className="bar">
                            <i
                                style={{
                                    width: v[3] * 7 + '%'
                                }}
                            />
                        </div>
                    </div>

                    <div className="meter">
                        <div>
                            <span>Risk</span>
                            <b>
                                {v[2] > 70
                                    ? 'High'
                                    : v[2] > 40
                                    ? 'Medium'
                                    : 'Low'}
                            </b>
                        </div>

                        <div className="bar">
                            <i
                                style={{
                                    width: v[2] + '%'
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <span>Time horizon</span>
                        <b style={{ color: 'var(--green)' }}>
                            {v[4]}
                        </b>
                    </div>

                    <div className="row">
                        <span>Best suited for</span>
                        <b style={{ color: 'var(--green)' }}>
                            {v[5]}
                        </b>
                    </div>

                    <div className="irows">
                        {INV.map((x, k) => (
                            <button
                                key={x[0]}
                                className={`irow ${
                                    k === i ? 'on' : ''
                                }`}
                                onClick={() => setI(k)}
                            >
                                <span>{x[0]}</span>

                                <span className="rk">
                                    {[0, 1, 2].map(d => (
                                        <u
                                            key={d}
                                            className={
                                                d <
                                                Math.ceil(
                                                    x[2] / 34
                                                )
                                                    ? 'f'
                                                    : ''
                                            }
                                        />
                                    ))}
                                </span>

                                <div className="bar">
                                    <i
                                        style={{
                                            width:
                                                x[3] * 7 + '%'
                                        }}
                                    />
                                </div>

                                <b>{x[3]}%</b>
                            </button>
                        ))}
                    </div>

                    <p className="note">
                        Illustrative information, not investment advice.
                    </p>
                </div>
            </div>
        </Reveal>
    )
}

export function Plan() {
    const [y, setY] = useState(10)

    const val = n =>
        42e5 * Math.pow(1.09, n)

    const H = n =>
        10 + (val(n) / val(20)) * 85

    const X = n =>
        ((n + 0.5) / 21) * 100

    const d = Array.from(
        { length: y + 1 },
        (_, i) =>
            (i ? 'L' : 'M') +
            X(i) +
            ' ' +
            (100 - H(i))
    ).join(' ')

    return (
        <Reveal id="plan">
            <span className="eyebrow">
                Plan wisely, not blindly
            </span>

            <h2>Drag into your future.</h2>

            <div className="goals pm">
                {[2, 5, 10, 15, 20].map(n => (
                    <button
                        key={n}
                        className={`pill ${
                            y === n ? 'on' : ''
                        }`}
                        onClick={() => setY(n)}
                    >
                        {n} yrs
                    </button>
                ))}
            </div>

            <input
                type="range"
                min="0"
                max="20"
                value={y}
                onChange={e => setY(+e.target.value)}
            />

            <div className="pgw">
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d={
                            d +
                            ' L' +
                            X(y) +
                            ' 100 L' +
                            X(0) +
                            ' 100Z'
                        }
                        fill="var(--mint)"
                        opacity=".45"
                    />

                    <path
                        d={d}
                        fill="none"
                        stroke="var(--green)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                <div className="tl">
                    {Array.from(
                        { length: 21 },
                        (_, i) => (
                            <i
                                key={i}
                                style={{
                                    height: H(i) + '%',
                                    opacity:
                                        i <= y ? 0.9 : 0.15
                                }}
                            />
                        )
                    )}
                </div>

                <div
                    className="mk"
                    style={{ left: X(y) + '%' }}
                >
                    <span>Year {y}</span>
                </div>
            </div>

            <div
                className="grid2"
                style={{ marginTop: 20 }}
            >
                <div>
                    <p>
                        In <b>{y}</b> years, your ₹42L could be
                    </p>

                    <div className="big-n">
                        <Count to={val(y)} />
                    </div>
                </div>

                <div>
                    <p>Potential growth</p>

                    <div
                        className="big-n"
                        style={{
                            fontSize:
                                'clamp(30px,5vw,52px)'
                        }}
                    >
                        +
                        <Count to={val(y) - 42e5} />
                    </div>
                </div>
            </div>

            <p className="note">
                Assumes 9% p.a. growth. Illustrative only.
            </p>
        </Reveal>
    )
}

export function Statement() {
    return (
        <Reveal
            id="statement"
            className="stmt"
        >
            <span className="eyebrow">
                <Ico k="pin" />
                Built for India
            </span>

            <p className="big">
                Understand before you invest.{' '}
                <span>Run the math.</span> Plan wisely, not blindly.
            </p>
        </Reveal>
    )
}

export function Insights() {
    const C = [
        [
            'FEATURED INSIGHT',
            'What actually changes when markets move?',
            'var(--forest)',
            '#fff'
        ],
        [
            'TAX',
            'The ₹1.5L habit most people start too late',
            'var(--mint)',
            'var(--forest)'
        ],
        [
            'PLANNING',
            'How much is "enough"? A calmer answer.',
            'var(--green)',
            '#fff'
        ]
    ]

    return (
        <Reveal id="insights">
            <span className="eyebrow">
                Plain-English insights
            </span>

            <h2>Finance, written like a magazine.</h2>

            <div className="mag2">
                {C.map(([t, h, bg, fg]) => (
                    <div
                        className="cv"
                        key={t}
                        style={{
                            background: bg,
                            color: fg
                        }}
                    >
                        <span>{t}</span>
                        <h3>{h}</h3>
                        <b>Read article →</b>
                    </div>
                ))}
            </div>
        </Reveal>
    )
}

export function Cta() {
    return (
        <Reveal
            id="cta"
            className="cta"
        >
            <span
                className="eyebrow"
                style={{
                    color: 'var(--mint)',
                    marginTop: 70
                }}
            >
                Fermor
            </span>

            <h2>Your money is a big picture.</h2>

            <p>One clearer view. Built for India.</p>

            <a href="#">
                <button className="btn">
                    Start exploring{' '}
                    <span className="ar">→</span>
                </button>
            </a>

            <img
                src="/logo.png"
                alt=""
                className="cta-f"
            />

            <div className="globe" />
        </Reveal>
    )
}