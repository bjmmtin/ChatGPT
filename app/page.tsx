import NavBar from "./NavBar";
import Footer from "./Footer";
import Land from "./land"
export default function Example (){
    return (
        <>
            <NavBar />
                <main className="lg:flex-1"><Land/></main>
            <Footer />
        </>
    )
}