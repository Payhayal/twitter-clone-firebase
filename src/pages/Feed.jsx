import Aside from "../components/Aside"
import Main from "../components/Main"
import Nav from "../components/Nav"


const feed = () => {
  
  return (
    <section className="h-screen grid grid-cols-4 xl:grid-cols-3 bg-black text-white overflow-hidden">
     <Nav />
     <Main />
     <Aside />
    </section>
  )
}

export default feed