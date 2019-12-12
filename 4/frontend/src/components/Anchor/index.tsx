import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
}

const Anchor: FC<Props> = ({ to, children }) => (
    <Link
        to={to}
        style={{
            textDecoration: 'none',
            outline: 'none',
            color: 'inherit',
        }}
    >
        {children}
    </Link>
);

export default Anchor;
