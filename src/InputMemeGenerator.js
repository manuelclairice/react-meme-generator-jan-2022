/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const inputStyle = css`
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-right: auto;
  margin-left: auto;
  font-size: 20px;
`;

export const inputField = css`
  font-size: 20px;
  margin: 5px;
  width: 400px;
  @media (max-width: 600px) {
    width: 300px;
  }
`;
