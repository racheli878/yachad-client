import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import AllEventsPage from "../pages/allEventsPage";
import Protect from "./protect";
import NewEventPage from "../pages/newEventPage";
import InvitationsPage from "../pages/invitationsPage";
import EventPage from "../pages/eventPage";
import EditEventPage from "../pages/editEventPage";
import Error404 from "../components/error404";
import Header2 from "../components/header2";
import Header from "../components/header";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                element: <Header />,
                children: [
                    {
                        index:true,
                        element:<LoginPage/>
                    },

                    {
                        path: "login",
                        element: <LoginPage />
                    },
                    {
                        path: "register",
                        element: <RegisterPage />
                    }
                ]
            },

            {
                element: <Protect token={true} />,
                children: [
                    {
                        element: <Header2 />,
                        children: [
                            {
                                path: "allEvents",
                                element: <AllEventsPage />
                            },
                            {
                                path: "event/:eventId",
                                element: <EventPage />
                            },
                            {
                                path: "addEvent",
                                element: <NewEventPage />
                            },
                            {
                                path: "event/:eventId/edit",
                                element: <EditEventPage />
                            },
                            {
                                path: "invitations",
                                element: <InvitationsPage />
                            }
                        ]
                    }
                ]
            },

            {
                path: "*",
                element: <Error404 />
            }
        ]
    }
]);

export default routes;