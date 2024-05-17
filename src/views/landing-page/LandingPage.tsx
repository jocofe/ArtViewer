import { Button } from "../../components/Buttons/Buttons"
import { SignUpForm } from "../../components/Form/SignUpForm"

export const LandingPage = () => {
    
    return (
        <div>
            <section className="hero">
                <div className="hero__text">
                    <h1>Find art to research</h1>
                </div>
                <div>
                    images
                </div>
            </section>
            <section className="section section--golden">
                <div>images</div>
                <div className="claim">
                    <h1>Search for some art piece</h1>
                    <h3>Are you studying some artist? Some movement? Just want to explore art? Try to explore now.</h3>
                    <Button size="large">Explore</Button>
                </div>
            </section>
            <section className="section section--wooden">
                <div className="claim">
                    <h1>Save your favorite art pieces</h1>
                    <h3>Put them in collections and organize them as you please for watching later.</h3>
                    <Button size="large">Explore</Button>
                </div>
                <div>
                    Images
                </div>
            </section>
            <div>
                <h1>Register now to watch art</h1>
                <SignUpForm/>
            </div>
        </div>
    )
}