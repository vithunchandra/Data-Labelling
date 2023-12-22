import { useEffect, useState } from "react";
import Navbar from "./worker/Navbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import IUser from "../interface/IUser";
import useAuth from "../customHooks/authenticate";
import { client } from "../api/client";
import { Logout } from "@mui/icons-material";
import logo from "../../public/Logo_2.png";

export default function MainLayout({
  navigation,
  user,
}: {
  navigation: NavigationInterface[];
  user: IUser;
}) {
  const [isDrawerOn, setIsDrawerOn] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pageName, setPageName] = useState(navigation[selectedIndex].name);
  const { getToken, logout } = useAuth();
  const navigate = useNavigate();
  client.defaults.headers.common["Authorization"] = "Bearer " + getToken();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setPageName(navigation[selectedIndex].name);
  }, [selectedIndex]);

  return (
    <div className="w-100 h-100">
      <div className="row flex-nowrap h-100 g-0">
        <div className="col-auto">
          <div
            id="sidebar"
            className="collapse collapse-horizontal bg-white show h-100 shadow"
          >
            <div id="sidebar-nav" className="d-flex flex-column h-100">
              <div className="w-100 d-flex align-items-center justify-content-between ps-2 py-2 fs-3 fw-bold">
                <div className="d-flex align-items-center fs-3 fw-bold">
                  <img
                    src={logo}
                    className="me-2"
                    style={{ height: "45px" }}
                  ></img>
                </div>
                <IconButton
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebar"
                  color="primary"
                  onClick={() => setIsDrawerOn(!isDrawerOn)}
                >
                  <ChevronLeftIcon fontSize="large" />
                </IconButton>
              </div>
              <List>
                {navigation.map((item, index) => {
                  return (
                    <Link
                      to={item.path}
                      className="text-decoration-none text-black"
                      key={index}
                    >
                      <ListItemButton
                        selected={selectedIndex === index}
                        className="px-4"
                        onClick={(event) => handleListItemClick(event, index)}
                        sx={{ marginY: "5px", paddingY: "0.8rem" }}
                      >
                        <ListItemIcon sx={{ minWidth: "40px" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ color: "black" }}
                          primary={item.name}
                        ></ListItemText>
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
              <div className="flex-fill"></div>
              <List>
                <ListItemButton
                  onClick={() => {
                    logout();
                    navigate("/signin");
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <Logout color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Log Out"}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "red",
                      borderColor: "blue",
                    }}
                  />
                </ListItemButton>
              </List>
              <div className="d-flex bg-primary text-white align-items-center py-3 px-2 border-top border-3 fs-6">
                Created By{" "}
                <span className="ms-1 d-inline-block"> @DatleTeams</span>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="col px-3 h-100 d-flex flex-column overflow-auto">
          <div className="position-sticky top-0" style={{ zIndex: 100 }}>
            <div className="pt-3 transcluent" />
            <Navbar
              isDrawerOn={isDrawerOn}
              setIsDrawerOn={setIsDrawerOn}
              pageName={pageName}
              user={user}
            ></Navbar>
          </div>
          <div className="flex-fill py-4" style={{ minHeight: "0" }}>
            <Outlet></Outlet>
            <div style={{ minHeight: "1.5rem", width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
