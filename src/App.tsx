import React, { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  border: "1px solid green",
  margin: 12,
  padding: 8,
};

function App() {
  let [ArrayLength, setArrayLength] = useState(20);
  const [dataSource, setDataSource] = useState(
    Array.from({ length: ArrayLength })
  );
  const [FakeArray, setFakeArray] = useState<any[]>([]);

  useEffect(() => {
    Fecth();
  }, []);

  const Fecth = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${ArrayLength}`
    );
    const posts = await res.json();
    setFakeArray(posts);
  };
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = async () => {
    if (ArrayLength < 101) {
      await Fecth();
      ArrayLength = ArrayLength + 20;
      setArrayLength(ArrayLength);
      setDataSource(dataSource.concat(Array.from({ length: ArrayLength })));
    } else {
      setHasMore(false);
    }
  };
  return (
    <div className="App">
      <p>
        Title: <b>InfiniteScrool Example</b>
      </p>
      <div id="parentScrollDiv" style={{ height: 500, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading..</p>}
          endMessage={<p>Page End!</p>}
          // height={520}
          scrollableTarget="parentScrollDiv"
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

// const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
// const posts = await res.json();
