import { Link } from "react-router-dom";
const Apps = () => (
  <div>
    <h2>Apps</h2>
    <ul>
      <li>
        <Link to="/apps/quran">Al-Quran Reader</Link>
      </li>
      {/* Add more apps here */}
    </ul>
  </div>
);
export default Apps;
