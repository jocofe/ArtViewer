import { useEffect, useState } from 'react';
import { Button } from "../../components/Buttons/Buttons"
import { RandomMosaicImages } from "../../components/Landing/RandomMosaicImages"
import { SignUpFromLanding } from "../../components/Landing/SignUpFromLanding"

export const LandingPage = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const texts = ['research', 'explore', 'inspire', 'collect', 'discover']

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [currentTextIndex, texts.length]);
    
    return (
        <div>
            <section className="hero">
                <div className="hero__text">
                    <h1 id="changing-text">Find art to <span className="changing-text">{texts[currentTextIndex]}</span></h1>
                </div>
                <div className="mosaic-images">
                    <div className="mosaic-column">
                        <RandomMosaicImages/>
                    </div>
                </div>
            </section>
            <section className="section section--golden">
                <div>images</div>
                <div className="section__claim">
                    <h1>Search for some art piece</h1>
                    <h3>Are you studying some artist? Some movement? Just want to explore art? Try to explore now.</h3>
                    <Button size="large" className="landing-btn">Explore</Button>
                </div>
            </section>
            <section className="section section--wooden">
                <div className="section__claim">
                    <h1>Save your favorite art pieces</h1>
                    <h3>Put them in collections and organize them as you please for watching later.</h3>
                    <Button size="large" className="landing-btn">Explore</Button>
                </div>
                <div>
                    Images
                </div>
            </section>
            <div className="register-claim section">
                <h1 className="section__claim--white">Register now to watch art</h1>
                <SignUpFromLanding/>
            </div>
        </div>
    )
}