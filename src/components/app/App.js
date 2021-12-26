import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
// import {MainPage, ComicsPage, SingleComicPage} from '../Pages';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import("../Pages/404"));
const MainPage = lazy(() => import("../Pages/MainPage"));
const ComicsPage = lazy(() => import("../Pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../Pages/SingleComicPage"));
const SingleCharPage = lazy(() => import("../Pages/SingleCharPage"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route exact path='/comics' element={<ComicsPage/>}/>
                            <Route exact path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route exact path='/character/:charId' element={<SingleCharPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

// class App extends Component {
//     state = {
//         selectedChar: null
//     }

//     onCharSelected = (id) => {
//         this.setState({
//             selectedChar: id
//         })
//     }

//     render() {
//         return (
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                     <ErrorBoundary>
//                         <RandomChar/>
//                     </ErrorBoundary>
//                     <div className="char__content">
//                         <ErrorBoundary>
//                             <CharList onCharSelected={this.onCharSelected}/>
//                         </ErrorBoundary>
//                         <ErrorBoundary>
//                             <CharInfo charId={this.state.selectedChar}/>
//                         </ErrorBoundary>
//                     </div>
//                     <img className="bg-decoration" src={decoration} alt="vision"/>
//                 </main>
//             </div>
//         )
//     }
// }

export default App;