import React, { FC, useEffect, useRef, CSSProperties } from "react";
import { TagSpan } from "./TagSpan";
import { Theme } from "../../types/theme";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ThemeProps {
    theme: Theme;
    index?: number;
}

export const ThemeCard: FC<ThemeProps> = ({ theme, index }: ThemeProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [voteCount, setVoteCount] = React.useState(theme.voteCount);
    const [isVoted, setIsVoted] = React.useState(false);
    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { x: -1000, opacity:0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "sine",
                    scrollTrigger: {
                        trigger: cardRef.current, 
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, []);

    const handleVote = () => {
        if (!isVoted) {
            setVoteCount(voteCount + 1);
            setIsVoted(true);
        } else {
            setVoteCount(voteCount - 1);
            setIsVoted(false);
        }
    };

    return (
        <div
            ref={cardRef}
            className="theme-card screen"
            style={{
                left: `${theme.voteCount * 8}px`,
                top: `${index ? index * 390 : 0}px`,
                '--after-content': `"#${index + 1}"`,
            } as CSSProperties}
        >
            <img src={theme.image} alt="Theme" className="theme-image" />
            <div className="theme-info">
                <h3 className="theme-title">{theme.title}</h3>
                <p className="theme-description">{theme.description.toUpperCase()}</p>
                <div className="theme-tags">
                    {theme.tags.map((tag, index) => (
                        <TagSpan key={index} text={tag} />
                    ))}
                </div>
                <div className="difficulty-container">
                    <h4>DIFFICULTY</h4>
                    <div className="difficulty-bar-container">
                        {Array.from({ length: theme.difficulty }, (_, i) => (
                            <div key={i} className="difficulty-bar"></div>
                        ))}
                    </div>
                </div>
                <div className="theme-vote">
                    <button className="vote-btn" onClick={handleVote} >SELECT</button>
                    <p className="vote-count">{voteCount} PLAYERS ONLINE</p>
                </div>
            </div>
        </div>
    );
};