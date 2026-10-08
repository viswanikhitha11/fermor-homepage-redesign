import { Nav, Hero, Footer } from '../components/Shell';
import {
    Statement,
    Snapshot,
    Health,
    Goals,
    Tools,
    Invest,
    Plan,
    Insights,
    Cta
} from '../components/Sections';

export default function Home() {
    return (
        <>
            <Nav />
            <Hero />
            <Statement />
            <Snapshot />
            <Health />
            <Goals />
            <Tools />
            <Invest />
            <Plan />
            <Insights />
            <Cta />
            <Footer />
        </>
    );
}