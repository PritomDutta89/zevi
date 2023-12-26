import React,{useState} from 'react';
import "../styles/search.scss";
import TrendingSuggestionBox from './TrendingSuggestionBox';

const SearchComponent = (props: any) => {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = () => {
      setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
      setTimeout(()=>{
        setIsInputFocused(false);
      }, 1000);
    };

  return (
    <>
    {
        props.logoTop ? 
        (<div className="container">
        <span className="logo">z e v i</span>
        <div className="search-container">
          <input type="text" id="myInput" placeholder="Search" onFocus={handleInputFocus} onBlur={handleInputBlur} />
        </div>
        {isInputFocused && <TrendingSuggestionBox />}
        </div> ):
        (<div style={{position: "sticky", top: 0, zIndex: 1}}>
            <div className="container-product">
                <span className="logo-product">z e v i</span>
                <div className="search-container-product">
                  <input type="text" id="myInputProduct" placeholder="Search" onFocus={handleInputFocus} onBlur={handleInputBlur} />
                </div>
            </div>
            {isInputFocused && <TrendingSuggestionBox />}
        </div>)
    }
      
    </>
  )
}

export default SearchComponent