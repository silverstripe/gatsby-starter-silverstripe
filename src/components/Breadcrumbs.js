import React from 'react';
import { Link } from 'gatsby';

const Breadcrumbs = ({ breadcrumbs }) => {
    if (!breadcrumbs.length) {
        return null;
    }
    return (
        <nav role="navigation" aria-label="Breadcrumbs">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">
                    Home
                </Link>
            </li>
            {breadcrumbs.map(({id, menuTitle, link}, i) => {
                const last = i === (breadcrumbs.length - 1);
                return last
                    ? <li key={id} className="breadcrumb-item active">{menuTitle}</li>
                    : <li key={id} className="breadcrumb-item"><Link to={link}>{menuTitle}</Link></li>
            })}
        </ol>
    </nav>

    );
};

export default Breadcrumbs;