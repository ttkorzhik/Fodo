import React, {useEffect} from 'react';

import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import CreateContainer from "./components/CreateContainer/CreateContainer";

import {Route, Routes} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

import {actionType} from "./context/reducer";
import {useStateValue} from "./context/StateProvider";

import {getAllFoodItems} from "./utils/firebaseFunctions";

import './App.css';

function App() {
    const [{ cartShow }, dispatch] = useStateValue();

    const dispatchData = (data: any) => {
        dispatch ({
            type: actionType.SET_FOOD_ITEMS,
            foodItems: data,
        });
    }

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatchData(data)
        }).catch((error: any) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(()=> {
        if (cartShow) {
            document.body.style.overflow = "hidden"
            window.scrollTo(0, -200)
        }
        else {
            document.body.style.overflow = "unset"
        }
    }, [cartShow])

  return (
      <AnimatePresence mode='wait'>
          <div className="App" id="home">
              <Header/>
              <main className="main">
                  <Routes>
                      <Route path="/" element={<MainContainer/>}/>
                      <Route path="/createItem" element={<CreateContainer/>}/>
                      <Route path={"*"} element={<MainContainer/>}/>
                  </Routes>
              </main>
          </div>
      </AnimatePresence>

  );
}

export default App;
