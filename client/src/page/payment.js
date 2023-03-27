import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Pay() {
  let navigate = useNavigate();

  const getToken = localStorage.getItem("token");
  const token = jwt(getToken);

  const { data: premium } = useQuery("premiumCache", async () => {
    const response = await API.get("/transactionId");
    return response.data.data.length;
  });

  const { data: status } = useQuery("statusCache", async () => {
    const response = await API.get("/transactionId");
    const length = response.data.data.length;
    return response.data.data[length - 1].statuspayment;
  });

  const { data: dueDate } = useQuery("duedateCache", async () => {
    const response = await API.get("/transactionId");
    const length = response.data.data.length;
    return response.data.data[length - 1].duedate;
  });
  const newDueDate = new Date(dueDate);

  const dateTimeNow = new Date();

  const { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + token.id);
    return response.data.data;
  });

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/transaction", {
        userid: user.id,
        startdate: dateTimeNow,
        duedate: dateTimeNow,
        statususer: "Not Active",
        statuspayment: "Pending",
      });

      const newToken = response.data.data.token;

      window.snap.pay(newToken, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/pay");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/pay");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/pay");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    // const myMidtransClientKey = "SB-Mid-client-kcBD2UV-NpQHxEFw";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <div style={{ backgroundColor: "#161616" }}>
      <Container className="vh-100 gap-4 text-white">
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          {premium !== 0 && dateTimeNow < newDueDate && status === "Success" ? (
            <div className="fw-bold text-success" style={{ fontSize: "36px" }}>
              Premium
            </div>
          ) : (
            <>
              <div className="fw-bold" style={{ fontSize: "36px" }}>
                Premium
              </div>
              <div className="my-5">
                Bayar sekarang dan nikmati streaming music yang kekinian dari
                <span className="fw-bold">
                  <span style={{ color: "#EE4622" }}> DUMB</span>SOUND
                </span>
                <div className="mt-2">
                  Hanya Rp 50,000 dapatkan akun premium selama 30 hari
                </div>
              </div>
              <Button
                className="border-0 px-5"
                style={{ backgroundColor: "#F58033" }}
                onClick={() => handleTransaction.mutate()}
              >
                PAY
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Pay;
