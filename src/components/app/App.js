import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../Pages';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route exact path='/' element={<MainPage/>}/>
                        <Route exact path='/comics' element={<ComicsPage/>}/>
                        <Route exact path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
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