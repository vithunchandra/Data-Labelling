import { useState } from "react";
import Navbar from "./Navbar";
import Offcanvas from "./Offcanvas";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout(){
    return(
        <div className="w-100">
            <div className="row flex-nowrap g-0">
                <div className="col-auto">
                    <div id="sidebar" className="collapse collapse-horizontal show border-end">
                        <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start min-vh-100">
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-bootstrap"></i> <span>Item</span> </a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-film"></i> <span>Item s</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-heart"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-bricks"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-clock"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-archive"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-gear"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-calendar"></i> <span>Item</span></a>
                            <a href="#" className="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i className="bi bi-envelope"></i> <span>Item</span></a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}