import './App.css';
// /** @jsxImportSource @emotion/react */
// // import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Input from './InputMemeGenerator';

function App() {
  const [data, setData] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [customUrl, setCustomUrl] = useState(
    'https://api.memegen.link/images/ds.png',
  );

  // Fetch template
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().catch((err) => {
      console.error(err);
    });
  }, []);

  // Functionality to download custom meme
  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }
  function downloadResource(URL, filename) {
    // If no filename is set, use filename from URL
    if (!filename) filename = URL.match(/\/([^/#?]+)[^/]*$/)[1];
    fetch(URL, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((event) => console.error(event));
  }

  return (
    <main>
      <section>
        <h1>Random meme Generator</h1>

        <Input
          text="Top text: "
          type="text"
          id="topText"
          placeholder="Top text"
          value={topText}
          onChange={(event) => {
            setTopText(event.currentTarget.value);
          }}
        />

        <Input
          text="Bottom text: "
          type="text"
          id="bottomText"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
          }}
        />

        <Input
          text="Meme template :"
          placeholder="Type here..."
          id="previewImage"
          value={previewImage}
          onChange={(event) => {
            setPreviewImage(event.currentTarget.value);
          }}
        />

        <div className="inputArea">
          <label htmlFor="previewImage">Meme template: </label>
          <select
            id="previewImage"
            placeholder="buzz"
            value={previewImage}
            onChange={(event) => {
              setPreviewImage(event.currentTarget.value);
            }}
          >
            {data.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => {
              setCustomUrl(
                `https://api.memegen.link/images/${previewImage}/${topText}/${bottomText}.jpg`,
              );
            }}
          >
            Preview meme
          </button>
          <button
            onClick={() => {
              downloadResource(
                `https://api.memegen.link/images/${previewImage}/${topText}/${bottomText}.jpg`,
              );
            }}
          >
            Download
          </button>
        </div>

        <div>
          <img data-test-id="meme-image" src={customUrl} alt="Custom meme" />
        </div>
      </section>
    </main>
  );
}

export default App;
