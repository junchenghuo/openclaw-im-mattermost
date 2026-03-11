// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

type Props = {
    width?: number;
    height?: number;
    className?: string;
}

const RedEmblemSvg = ({width = 22, height = 22, className}: Props) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 100 100'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
        >
            <defs>
                <radialGradient
                    id='red-emblem-gradient'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(50 50) rotate(90) scale(50)'
                >
                    <stop
                        offset='0'
                        stopColor='#FF5573'
                    />
                    <stop
                        offset='1'
                        stopColor='#FF0035'
                    />
                </radialGradient>
                <filter
                    id='red-emblem-glow'
                    x='-35%'
                    y='-35%'
                    width='170%'
                    height='170%'
                >
                    <feGaussianBlur
                        stdDeviation='4'
                        result='blur'
                    />
                    <feColorMatrix
                        in='blur'
                        type='matrix'
                        values='1 0 0 0 0 0 0.08 0 0 0 0 0 0.25 0 0 0 0 0 1 0'
                    />
                </filter>
            </defs>

            <path
                d='M30 6H70L94 30V70L70 94H30L6 70V30L30 6ZM50 24L60 34H74V46L84 56L74 66V78H60L50 88L40 78H26V66L16 56L26 46V34H40L50 24Z'
                fill='url(#red-emblem-gradient)'
                fillRule='evenodd'
                clipRule='evenodd'
                filter='url(#red-emblem-glow)'
            />
        </svg>
    );
};

export default RedEmblemSvg;
