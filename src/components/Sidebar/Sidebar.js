import "./Sidebar.css";

const Sidebar = ({ avatarUrl }) => {
  return (
    <div className="sidebar">
        <div className="icon-group">
            <div
              className="small-avatar"
              style={{
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: avatarUrl ? "transparent" : "#ccc",
              }}/>
            <ul>
                <li><a href="#">⚙️</a></li>
                <li><a href="#">🔔</a></li>
            </ul>
        </div>
        <input type="text" placeholder="🔍 Search for..." />
        <ul>
            <li><a href="#">📝 Edit Profile</a></li>
            <hr/>
            <li><a href="#">🌍 Created Trips</a></li>
            <hr/>
            <li><a href="#">⭐ Favorite Place</a></li>
            <hr/>
        </ul>
    </div>
  );
};

export default Sidebar;