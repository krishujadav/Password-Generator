import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numbeAllowed, setNumbeAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numbeAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()[]{}/*-+~`;\'.';

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numbeAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    try {
      passwordRef.current?.select();
      document.execCommand('copy');
      alert('Password copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy password!');
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numbeAllowed, charAllowed, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 text-lg">
        <h1 className="text-center text-white my-3 text-3xl">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-4 py-1"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-base gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbeAllowed}
              id="numberInput"
              onChange={() => setNumbeAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
