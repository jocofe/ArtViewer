import { useEffect, useState } from 'react';
import { Button } from "../../components/Buttons/Buttons"
import { RandomMosaicImages } from '../../components/MosaicImage/RandomMosaicImages';
import { SignUpFromLanding } from "../../components/Form/SignUpFromLanding"
import { TypingBar } from '../../components/TypingBar/TypingBar';

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
                <TypingBar/>
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
                    <div className='collect-bg'>
                        <p className='collect-bg__text'>My collection of Picasso</p>
                    </div>
                    <div className='collect-wrapper'>
                        <img className='collect-card' src="https://uploads2.wikiart.org/00198/images/pablo-picasso/old-guitarist-chicago.jpg!Large.jpg" alt="El viejo guitarrista ciego - Pablo Picasso" />
                        <img className='collect-card' src="https://s1.significados.com/foto/cubismo-picasso-significados_bg.jpg?class=article" alt="Las señoritas de Aviñón - Pablo Picasso" />
                        <img className='collect-card' src="https://arteref.com/wp-content/uploads/2021/12/Pablo_Picasso_1910_Girl_with_a_Mandolin_Fanny_Tellier_oil_on_canvas_100.3_x_73.6_cm_Museum_of_Modern_Art_New_York.-1-1.jpg" alt="Mujer con una guitarra - Pablo Picasso" />
                    </div>
                </div>
            </section>
            <div className="register-claim section">
                <h1 className="register-claim__text">Register now to watch art</h1>
                <SignUpFromLanding/>
            </div>
        </div>
    )
}