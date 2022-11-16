import React, { useEffect } from "react";
import "../Form/Form.css";

function Form({ onSubmit, buttonText, isSendingForm, isSuccessSendingForm }) {
  
  const [phone, setPhone] = React.useState("");

  const [phoneDirty, setPhoneDirty] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState("Phone не может быть пустым");

  const [formValid, setFormValid] = React.useState(false);

// useEffect((e) => {
//   if (isSuccessSendingForm) {
//     // setName("");
//     // setPhone("");
//     // setEmail("");
//     // setComment("");
//     e.target.reset();
// }, [name, phone, email, comment]);

useEffect(() => {
    if (phoneError) {
        setFormValid(false);
    } else {
        setFormValid(true);
    }
}, [phoneError]);

const blurHandler = (e) => {
    switch (e.target.name) {
        case "phone":
            setPhoneDirty(true);
            break;
    }
}


const phoneHandler = (e) => {
    setPhone(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 20) {
        setPhoneError("Некорректный номер телефона");
        if (!e.target.value) {
            setPhoneError("Phone не может быть пустым")
        }
    } else {
        setPhoneError("");
    }
}

  function onSubmitHandler(event) {
    event.preventDefault();

    onSubmit({ phone });
    // event.target.reset();
  }

  return (
    <>
      <form
        className="form form-edit"
        name={`form`}
        noValidate
        onSubmit={onSubmitHandler}
      >
        <fieldset className="form__contact-info">
          <div className="form__wrapper">
            <input
              type="number"
              id="input-title"
              className="form__info form__info_type_title"
              // onChange={changePhoneHandler}
              onChange={e => phoneHandler(e)}
              onBlur={e => blurHandler(e)}
              name="phone"
              value={phone}
              // min="2"
              // max="20"
              placeholder="Ваш номер ..."
              autoComplete="off"
              required
            />
            {(phoneError && phoneDirty) && <div className="form__valid-error">{phoneError}</div>}
          </div>
          <div className="form__button_type_wrapper">
            <button
              type="submit"
              className="form__button form__button-submit"
              name="submit"
              disabled={!formValid}
              // disabled={isSendingForm}
            >
              {isSendingForm ? buttonText + "..." : buttonText}
            </button>
          </div>
          
        </fieldset>
      </form>
    </>
  );
}

export default Form;
