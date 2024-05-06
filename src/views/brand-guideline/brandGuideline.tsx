import { Link, Outlet } from "react-router-dom"
import { IconLogotype } from "../../components/Icons/icons"
import { Footer } from "../../layouts/Footer/Footer"

export const BrandGuideline = () => {
    
    
    return (
        <>
        <div className="topbar--guideline">
            <div className="topbar__logo">
                <Link to={'/'}>
                    <IconLogotype />
                </Link>
            </div>
            <div className="topbar__nav">
                <a href="/">Home</a>
            </div>
        </div>
        <section className="header">
            <div className="header__content">
                <h2 className="header__title">
                ArtViewer Pattern Library
                </h2>
                <h3 className="header__subtitle">Our guide used to build the ArtViewer application.</h3>
            </div>
        </section>
        <section className="guide">
            <div className="guide__navbar">
                <div className="navbar-wrapper">
                    <p className="navbar__title">Foundations</p>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <a href="/brand-guidelines/typography">
                                <span className="nav-label">Typography</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/color">
                                <span className="nav-label">Color</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/grid-system">
                                <span className="nav-label">Grid System</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/icons">
                                <span className="nav-label">Icons</span>
                            </a>
                        </li>
                    </ul>
                    <p className="navbar__title">Components</p>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <a href="/brand-guidelines/buttons">
                                <span className="nav-label">Buttons</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/dialogs">
                                <span className="nav-label">Dialogs</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/avatars">
                                <span className="nav-label">Avatars</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/feedback-elements">
                                <span className="nav-label">Feedback Elements</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/navigation">
                                <span className="nav-label">Navigation</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/form-elements">
                                <span className="nav-label">Form Elements</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/brand-guidelines/cards">
                                <span className="nav-label">Cards</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="guide__content">
                <Outlet />
            </div>
        </section>
        <Footer />
        </>
        
    )
}