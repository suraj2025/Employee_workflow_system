import {
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import { refreshAccessToken } from "../services/authService";

function SessionTimer() {

    const SESSION_DURATION =
        3 * 60;

    const WARNING_TIME =
        60;

    const [timeLeft, setTimeLeft] =
        useState(SESSION_DURATION);

    const [showPopup, setShowPopup] =
        useState(false);

    useEffect(() => {


        const interval = setInterval(() => {
            const loginTime =
                Number(
                    localStorage.getItem("loginTime")
                );

            const currentTime =
                Date.now();

            const elapsedSeconds =
                Math.floor(
                    (currentTime - loginTime) / 1000
                );

            const remaining =
                SESSION_DURATION
                - elapsedSeconds;

            setTimeLeft(remaining);

            if (
                remaining <= WARNING_TIME
                &&
                remaining > 0
                &&
                !showPopup
            ) {

                setShowPopup(true);
            }

            if (remaining <= 0) {

                clearInterval(interval);

                handleLogout();
            }

        }, 1000);

        return () =>
            clearInterval(interval);

    }, []);

    const handleExtendSession =
        async () => {

            try {

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );

                if (!refreshToken) {

                    handleLogout();

                    return;
                }

                const response =
                    await refreshAccessToken(
                        refreshToken
                    );

                localStorage.setItem(
                    "token",
                    response.token
                );

                localStorage.setItem(
                    "loginTime",
                    Date.now().toString()
                );

                setShowPopup(false);
                localStorage.setItem(
                    "loginTime",
                    Date.now().toString()
                );
                setTimeLeft(
                    SESSION_DURATION
                );

                toast.success(
                    "Session extended"
                );

            } catch (error) {

                toast.error(
  "Your session expired because account logged in from another device"
);

                handleLogout();
            }
        };

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    return (

        <>

            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">

                Session:
                {" "}
                {minutes}:
                {seconds
                    .toString()
                    .padStart(2, "0")}

            </div>

            {
                showPopup && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white p-8 rounded-2xl w-96">

                            <h2 className="text-2xl font-bold mb-4">

                                Session Expiring

                            </h2>

                            <p className="mb-6">

                                Your session will expire soon.

                            </p>

                            <div className="flex justify-end gap-4">

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >

                                    Logout

                                </button>

                                <button
                                    onClick={
                                        handleExtendSession
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >

                                    Extend Session

                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

        </>
    );
}

export default SessionTimer;