import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Menu = (props) => {
    const result = useStaticQuery(graphql`
        query {
            allSsSiteTreeInterface(filter: {
                parentID: { eq: 0 }
            }) {
                nodes {
                    menuTitle
                    id
                    link
                }
            }
        }
    `);
    return (
        <ul>
            {result.allSsSiteTreeInterface.nodes.map(page => (
                <li key={page.id}><Link to={page.link}>{page.menuTitle}</Link></li>
            ))}
        </ul>
    )
};

export default Menu;