import { Button } from "../Button/Button";
import { Container } from "../Container/Container";
import css from "./Hero.module.css";

import hero1x from "../../img/hero@1x.jpg";
import hero2x from "../../img/hero@2x.jpg";

const handleClick = () => {

}

export const Hero = () => {
  return (
    <section className={css.heroSection}>
        <Container >
            <div className={css.heroWrapper}>
                <div className={css.heroTextContent}>
                    <div className={css.heroTextWrapper}>
                        <h1 className={css.title}>
                            The road to the <span className={css.accent}>depths</span> of the human soul
                        </h1>
                        <p className={css.text}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
                    </div>
                    <Button handleClick={handleClick} type="button" variant="filled" horizontalPaddings={50}>
                        Get started
                        <svg width={12} height={12} className={css.iconArrow}>
                            <use href="sprite.svg#arrow-right-top"></use>
                        </svg>
                    </Button>
                </div>
                <div className={css.heroImgWrapper}>
                    <picture>
                        <source srcSet={`${hero1x} 1x, ${hero2x} 2x`} />
                        <img  className={css.heroImg}
                            src={hero1x}
                            alt="photo psychologist"
                        />
                    </picture>
                    
                    <div className={css.decorationBlok}>
                        <div className={css.decorationBlokSvgWrap}>
                            <svg width={30} height={30} className={css.iconCheck}>
                                <use href="sprite.svg#check"></use>
                            </svg>
                        </div>
                        <div className={css.decorationBlokContentWrap}>
                            <p className={css.decorationText}>Experienced psychologists</p>
                            <p className={css.decorationNumber}>15,000</p>
                        </div>
                    </div>
                    
                    <div className={css.decorationUsersIcon}>
                        <svg width={24} height={24} className={css.iconWhite}>
                            <use href="sprite.svg#users"></use>
                        </svg>
                    </div>
                    
                    <div className={css.decorationQuestionIcon}>
                        <svg width={20} height={20} className={css.iconWhite}>
                            <use href="sprite.svg#question"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={css.circle}></div>
        </Container>
    </section>
  )
}
