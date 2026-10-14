import React from "react";
import { Container } from "react-bootstrap";

export default function PanelLayout({ user, roleLabel, activePage, onNavigate, navItems, children }) {
  const displayName = user?.name || user?.email || "Food Rush user";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-icon"><i className="bi bi-egg-fried"></i></div>
          <div><h4>Food Rush</h4><span>{roleLabel} Panel</span></div>
        </div>
        <p className="sidebar-heading">MAIN MENU</p>
        {navItems.map((item) => (
          <button
            type="button"
            key={item.name}
            className={`sidebar-link ${activePage === item.name ? "active" : ""}`}
            onClick={() => onNavigate(item.name)}
          >
            <i className={`bi ${item.icon}`}></i><span>{item.name}</span>
          </button>
        ))}
        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="profile-avatar">{initial}</div>
            <div className="panel-profile-text">
              <h6>{displayName}</h6>
              <span>{roleLabel}</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div><h5>{activePage}</h5><p>{user?.email}</p></div>
          <div className="admin-topbar-right">
            <span className="admin-live"><span></span> Account active</span>
            <div className="profile-avatar">{initial}</div>
          </div>
        </header>
        <Container fluid className="admin-content">{children}</Container>
      </main>
    </div>
  );
}
