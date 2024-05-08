import React from "react"

export const BrandTypography = () => {
    return (
        <div className="guide-wrapper">
            <div className="guide__intro">
                <h1 className="guide__title">Typography</h1>
                <h2 className="guide__subtitle">We use only one typography, Hanken Grotesk.</h2>    
                <p className="guide__text">A Sans Serif font from the Neo-Grotesk family has been chosen to focus on readability given that it is an application that contains a lot of information and thus makes it easier for the user to read.</p>
            </div>
            <div className="guide__scale">
                <h2 className="guide__title">Type Scale</h2>
                <div className="guide__list-wrapper">
                    <ul className="guide__list">
                        <li className="list__label">
                            <span className="h1">Heading One</span>
                            <span className="size">72px/70px</span>
                        </li>
                        <li className="list__label">
                            <span className="h2">Heading Two</span>
                            <span className="size">48px/60px</span>
                        </li>
                        <li className="list__label">
                            <span className="h3">Heading Three</span>
                            <span className="size">28px/35px</span>
                        </li>
                        <li className="list__label">
                            <span className="h4">Heading Four</span>
                            <span className="size">20px/25px</span>
                        </li>
                        <li className="list__label">
                            <span className="body">Body</span>
                            <span className="size">16px/24px</span>
                        </li>
                        <li className="list__label">
                            <span className="button">Button & Meta</span>
                            <span className="size">14px/24px</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="guide__paragraphs">
                <h2 className="guide__title">Paragraphs</h2>
                <p className="guide__text">The body text is 16px or 1.6rem. The paragraph max-width is 635px.</p>
                <div className="guide__example">
                    <h2>Main section title</h2>
                    <h3>Sub-title section</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    )
}