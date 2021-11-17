import {Link, Route, Routes} from "react-router-dom";
import React from "react";
import {Topic} from "./Topic";

export const Topics = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to="rendering">Rendering with React</Link>
        </li>
        <li>
          <Link to="components">Components</Link>
        </li>
        <li>
          <Link to="props-v-state">Props v. State</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={<h3>Please select a topic.</h3>} />
        <Route path={`:topicId`} element={<Topic />} />
      </Routes>
    </div>
  );
}
