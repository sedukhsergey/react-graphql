import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {Home} from "./components/Home";
import {Topics} from "./components/Topics";
import {Posts} from "./components/Posts";
import { LessonSubscription } from './components/LessonsSubscription'

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
          <li>
            <Link to="posts">Posts</Link>
          </li>
          <li>
            <Link to="lessons-subscription">Lesson Subscription</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="topics/*" element={<Topics />} />
            <Route path="posts/*" element={<Posts />} />
            <Route path="lessons-subscription" element={<LessonSubscription />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
