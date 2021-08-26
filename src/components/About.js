// component that renders text to describe purpose of app
const About = () => {
    return (
        <div>
            <br />
            <h2>Calc Buddy</h2>
            <br />
            This is an app to help you efficiently memorize the core identities/formulas used in calculus.
            <br /><br />
            Every day, you will automatically be assigned a set of daily problems to solve. 
            Having to actively recall an answer is a stronger way of testing your understanding compared to browsing your formula sheet.
            <br /><br />
            Based on how often you answer correctly, a scheduling algorithm will re-assign the same question some time in the future at increasing intervals.
            Reviewing your knowledge ocassionally drastically strengthens your long-term memory, a concept known as spaced repitition.
            <br /><br />
            This math application is an implemented version of Anki. 
            The benefit is that you don't have to make your own deck of cards, and the application calculates whether your solution is mathematically equivalent to the question.
            For more information, check out the <a href="https://docs.ankiweb.net/background.html">Anki Manual</a>
        </div>
    )
}

export default About