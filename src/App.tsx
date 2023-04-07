import React, { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  border: "1px solid green",
  margin: 12,
  padding: 8,
};

function App() {
  let [ArrayLength, setArrayLength] = useState(0);
  const [dataSource, setDataSource] = useState(
    Array.from({ length: ArrayLength })
  );
  const [FakeArray, setFakeArray] = useState<any[]>([]);

  useEffect(() => {
    Fecth();
  }, []);

  const Fecth = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${ArrayLength}&_limit=10`
    );
    const posts = await res.json();
    setFakeArray(FakeArray.concat(posts));
  };
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = async () => {
    if (ArrayLength < 101) {
      await Fecth();
      ArrayLength = ArrayLength + 10;
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