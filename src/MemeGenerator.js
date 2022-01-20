/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import Button from './ButtonMemeGenerator';
import Input from './InputMemeGenerator';

function App() {
  // create useState
  const [memeData, setMemeData] = useState([]);
  const [topText, setTopText] = useState('CODING');
  const [bottomText, setBottomText] = useState('MYSTERY');
  const [imageStyle, setImageStyle] = useState('aag');
  const [customUrl, setCustomUrl] = useState(
    'https://api.memegen.link/images/aag/coding/mystery.png',
  );
  // Fetch data from then memegen website
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const json = await response.json();
        setMemeData(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

    // eventhandler
    const onModifyTopText = (event) => {
      setTopText(event.currentTarget.value);
    };
    const onModifyBottomText = (event) => {
      setBottomText(event.currentTarget.value);
    };
    const onChangeImageStyle = (event) => {
      setImageStyle(event.currentTarget.value);
    };

    // change the ? \ / # " - _ for the url
    const modifiedTopText = topText
      .replace(/\?/g, '~q')
      .replace(/%/g, '~p')
      .replace(/\//g, '~s')
      .replace(/#/g, '~h')
      .replace(/"/g, "''")
      .replace(/_/g, '__')
      .replace(/-/g, '--');

    const modifiedBottomText = bottomText
      .replace(/\?/g, '~q')
      .replace(/%/g, '~p')
      .replace(/\//g, '~s')
      .replace(/#/g, '~h')
      .replace(/"/g, "''")
      .replace(/_/g, '__')
      .replace(/-/g, '--');

    // on Generate Click function
    const onGenerateClick = () => {
      setCustomUrl(
        `https://api.memegen.link/images/${imageStyle}/${modifiedTopText}/${modifiedBottomText}.jpg`,
      );
    };

    // on Download Click funtion
    const onDownloadClick = () => {
      saveAs(customUrl, `${imageStyle}-${topText}-${bottomText}.jpg`);
    };

    // on Clear Click function
    const onClearClick = () => {
      setBottomText('');
      setTopText('');
    };

    // CSS in JS
    const memeImage = css`
      display: block;
      width: 50%;
      margin-right: auto;
      margin-left: auto;
      @media (max-width: 600px) {
        width: 90vw;
      }
    `;

    const buttonDiv = css`
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      @media (max-width: 600px) {
        display: block;
        margin: auto;
        width: 50%;
      }
    `;

    const optionInput = css`
      display: flex;
      flex-direction: column;
      font-size: 20px;
      margin: 10px;
    `;

    return (
      <div>
        <Input
          htmlFor="topText"
          text="text on top"
          type="text"
          id="topText"
          placeholder="Top text"
          value={topText}
          onChange={onModifyTopText}
        />
        <Input
          htmlFor="bottomText"
          text="text on bottom"
          type="text"
          id="bottomText"
          placeholder="Bottom text"
          value={bottomText}
          onChange={onModifyBottomText}
        />
        {/* Dropdown menu for the memes  */}
        <div css={optionInput}>
          <label htmlFor="imageStyle">Enter your image style: </label>
          <select
            css={dropdownMenu}
            id="imageStyle"
            placeholder="your meme"
            value={imageStyle}
            onChange={onChangeImageStyle}
          >
            {memeData.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div css={buttonDiv}>
          <Button click={onGenerateClick}>GENERATE</Button>
          <Button click={onDownloadClick}>DOWNLOAD</Button>
          <Button click={onClearClick}>CLEAR</Button>
        </div>
        <div>
          <img css={memeImage} src={customUrl} alt="Meme" />
        </div>
      </div>
    );
  ;

export default App;
