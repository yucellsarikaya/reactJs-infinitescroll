import React, { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  border: "1px solid green",
  margin: 12,
  padding: 8,
};

function App() {
  let [ArrayStart, setArrayStart] = useState(0); 
  const [FakeArray, setFakeArray] = useState<any[]>([]);

  useEffect(() => {
    Fecth();
  }, []);

  const Fecth = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${ArrayStart}&_limit=10`
    );
    const resData = await res.json();
    setFakeArray(FakeArray.concat(resData));
  };

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    if (ArrayStart < 101) {
      await Fecth();
      ArrayStart = ArrayStart + 10;
      setArrayStart(ArrayStart);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="App">
      <p>
        Title: <b>Infinite Scroll Example</b>
      </p>
      <div>
        <InfiniteScroll
          dataLength={FakeArray.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading..</p>}
          endMessage={<p>Page End!</p>}
          height={"500px"}
        >
          {FakeArray.map((item, index) => {
            return (
              <div style={style} key={index}>
                {item.title}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default App; 