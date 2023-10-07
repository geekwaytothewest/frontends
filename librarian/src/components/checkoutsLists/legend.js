import React from 'react';
import { legendStyles } from './legend.styles';

export default () => (
    <dl className={legendStyles}>
        <dd>&lt; 3h</dd>
        <dt className="success" />
        <dd>&ge; 3h</dd>
        <dt className="warning" />
        <dd>&ge; 5h</dd>
        <dt className="danger" />
    </dl>
);