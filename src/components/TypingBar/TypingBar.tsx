import { Cursor, useTypewriter } from "react-simple-typewriter";
import { SearchGlass } from "../Icons/icons"

export const TypingBar = () => {
    const [typeEffect] = useTypewriter({
        words: ['Picasso', 'Da Vinci', 'Monet', 'Rembrandt'],
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1000,
        loop: 0
    })

    return (
        <div className="art">
            <div className="art--bg">
                <div className="art--sm">
                    <img src="https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvYXMwMjE1Ny0xMy5qcGciLCJyZXNpemUsNjAwLDYwMCJdfQ.K-JoLhTsWrLWbd17b9vLni8mMLj90HlzAyVfym_GDW0.jpg" alt="Muchacha en la ventana por Dalí" />
                </div>
                <div className="art--sm">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/mona-lisa-also-called-la-gioconda-or-la-joconde-c1503-1506-news-photo-1652350725.jpg" alt="La Gioconda por DaVinci" />
                </div>
            </div>
            <div className="art--top">
                <div className="art--md">
                    <img src='https://www.copistes.com/fichiers/0197694001288794953.jpg' alt="Tarde de domingo en la isla de Grande Jatte por George Seurat" />
                </div>
            </div>
            <div>
                <div className="typing-wrapper">
                    <SearchGlass/>
                    <div className="dynamic-text">
                        <span>{typeEffect}</span>
                        <Cursor/>   
                    </div>
                </div>
            </div>
        </div>
    )
}