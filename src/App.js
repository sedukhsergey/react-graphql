import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Routes app is the same as code-splitting
// any other React app.

export default function NestingExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="topics/*" element={<Topics />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics() {
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

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
