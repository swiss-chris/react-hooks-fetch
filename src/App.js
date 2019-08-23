import React, { useState, useEffect } from 'react';
import queryString from 'query-string'

function App({ location }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const query = queryString.parse(location.search).query || "users";

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${query}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('HTTP Status was not 200/ok');
        }
      })
      .then(data => {
        setData(data);
      })
      .catch(() => {
        setData([])
      })
      .finally(() => {
        setLoading(false);
      })
  }, [query])

  return (<div>
    <pre>
      ?query=posts    100 posts <br />
      ?query=comments 500 comments <br />
      ?query=albums   100 albums <br />
      ?query=photos   5000 photos <br />
      ?query=todos    200 todos <br />
      ?query=users    10 users <br />
    </pre>

    {
      loading ? (
        <h1>Loading...</h1>
      ) : !data.length ? (
        <h1>No Data found!</h1>
      ) : (
            <div>
              <h1>Showing results for "{query}"</h1>
              {data.map((item, index) => (
                <pre key={index}>{JSON.stringify(item, null, 4)}</pre>
              ))}
            </div>
          )
    }
  </div>
  )
}

export default App;
