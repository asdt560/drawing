import React from 'react';

const Toolbar = () => {
  return (
    <div>
      <h1>Draw-App</h1>
      <input type="color" aria-label="color" id="color" />
      <input type="linewidth" aria-label="linewidth" id="width" value="5" />
      <button type="button" id="reset">Reset</button>
    </div>
  );
};

export default Toolbar;
