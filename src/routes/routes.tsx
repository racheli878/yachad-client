import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/entrance/loginPage";
import RegisterPage from "../pages/entrance/registerPage";
import AllEventsPage from "../pages/events/allEventsPage";
import Protect from "./protect";
import NewEventPage from "../pages/changeEvent/newEventPage";
import InvitationsPage from "../pages/invitations/invitationsPage";
import EventPage from "../pages/event/eventPage";
import EditEventPage from "../pages/changeEvent/editEventPage";
import Error404 from "../components/error404";
import Header2 from "../components/header2";
import Header from "../components/header";
import GuestOnly from "./guestOnly";
import Expenses from "../pages/event/expenses/expenses";
import AllParticipantsPage from "../pages/event/allParticipants/allParticipantsPage";
import Survey from "../pages/event/survey/survey";
import EventHome from "../pages/event/tasksAndParticipants/eventHome";
import AddQuestion from "../pages/event/survey/addQuestion";
import LandingPage from "../pages/landingPage";
import ProfilePage from "../pages/profile/profilePage";



const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,

        children: [
            {
                element: <GuestOnly />,
                children: [
                    {
                        element: <Header />,
                        children: [
                            {
                                index: true,
                                element: <LandingPage />
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
                    }
                ]
            },

            {
                element: <Protect />,
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
                                element: <EventPage />,
                                children: [
                                    {
                                        index: true,
                                        element: <EventHome />
                                    },
                                    {
                                        path: "survey",
                                        element: <Survey />
                                    },

                                    {
                                        path: "expenses",
                                        element: <Expenses />
                                    },

                                    {
                                        path: "participants",
                                        element: <AllParticipantsPage />
                                    },

                                    {
                                        path: "survey/add",
                                        element: <AddQuestion />
                                    }
                                ]
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
                            },
                            {
                                path: "profile",
                                element: <ProfilePage />
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