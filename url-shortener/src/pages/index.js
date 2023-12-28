import { useState, useEffect } from 'react';
import axios from 'axios';

const UrlShortener = () => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000', {
        "Content-Type": "application/json",
      });
      console.log(response)
      setUrls(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShorten = async () => {
    const response = await axios.post('http://localhost:8000', { url: newUrl });
    setShortUrl(response.data.url.shortUrl);
    setNewUrl('');
    fetchData();
  };

  return (
    <div>
      <h1>URL Shortener</h1>

      <div>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button onClick={handleShorten}>click</button>
        {shortUrl && (
          <p>Shortened URL: <a href={shortUrl}  >{shortUrl}</a></p>
        )}
      </div>

      <div>
        <h2>URLs</h2>
        <ul>
          {urls.map(url => (

            <li key={url._id}>
              {console.log(urls)}
              <a href={url.longUrl}  >{url.longUrl}</a>
              <span>Short URL: <a href={`http://localhost:8000/${url.shortUrl}`}>{`http://localhost:8000/${url.shortUrl}`}</a></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UrlShortener;