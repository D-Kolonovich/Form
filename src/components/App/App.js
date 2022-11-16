import "../../vendor/normalize.css";
import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";

import "../App/App.css";
import Popup from "../Popup/Popup";
import Form from "../Form/Form";
import api from "../utils/api";

function App() {
  const [isPopupFeedbackOpen, setPopupFeedbackOpen] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isErrorSendingForm, setIsErrorSendingForm] = useState(false);
  const [isSuccessSendingForm, setIsSuccessSendingForm] = useState(false);

  const openPopupHandler = () => {
    setIsSuccessSendingForm(false);
    setPopupFeedbackOpen(true);
  };

  const closePopupsHandler = () => {
    setPopupFeedbackOpen(false);
  };

  const onSubmitHandler = ({ phone }) => {
    console.log( phone);
    setIsSendingForm(true);
    setIsErrorSendingForm(false);

    api
      .setFeedBack({ phone })
      .then(() => {
        setIsSuccessSendingForm(true);
      })
      .catch(() => setIsErrorSendingForm(true))
      .finally(() => setIsSendingForm(false));
  };

  return (
    <div className="App">
      <Header />
      <Main onClickPromoButton={openPopupHandler} />
      <Popup isOpen={isPopupFeedbackOpen} onClose={closePopupsHandler}>
        {!isSuccessSendingForm && (
          <>
            <h2 className="title title_place_popup">Тестовое задание</h2>
            <p className="description">
              Оставьте заявку и мы обязательно Вам поможем!
            </p>
            {isErrorSendingForm && (
              <div className="error-form">
                что-то пошло не так, пожалуйста, напишите письмо на <a href="dmitriy.kolonovich@mail.ru" className="error-email">dmitriy.kolonovich@mail.ru</a>
              </div>
            )}
            <Form
              onSubmit={onSubmitHandler}
              isSending={isSendingForm}
              buttonText="ЗАКАЗАТЬ"
              isSuccessSendingForm={isSuccessSendingForm}
            />
          </>
        )}
        {isSuccessSendingForm && (
          <div className="done-form">УЖЕ ВЫХОДИМ С ВАМИ НА СВЯЗЬ</div>
        )}
      </Popup>
    </div>
  );
}

export default App;
