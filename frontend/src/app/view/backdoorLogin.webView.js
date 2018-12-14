import React from "react";
import styled from "styled-components";
import className from "classnames";
import LoadingIcon from "../../share/loadingIcon";
import BackdoorLoginViewPropType from "@gn/common/app/propTypes/backdoorLogin.view.propType";

const Style = styled.div`
  margin-top: 10px;
  background-color: rgb(247, 208, 177);
  padding: 10px;
  text-align: center;
`;

function BackDoorLoginWebView(props) {
  const {
    isEmailValid,
    isNameRequire,
    nameIsEmpty,
    //---
    isSubmitFormClicked,
    isAjaxing,
    email,
    name,
    //---
    onSubmit,
    onEmailChange,
    onNameChange
  } = props;

  const isTryToSubmitInvalidEmail = isSubmitFormClicked && !isEmailValid;
  const _onEmailChange = e => {
    onEmailChange(e.target.value);
  };

  const _onNameChange = e => {
    onNameChange(e.target.value);
  };
  return (
    <Style>
      <h2>back door login</h2>
      <p>
        This is Good Neighbor <b>testing</b> site. To make testing easy, you can
        use <b>back door login</b> to by pass Google login. <b>Note</b>: name
        field is optional unless you want to create a new account. Check out
        'testing site: back door login' video for more info.
      </p>

      <p>
        <mark>
          <b>WARNING: </b>
          expect your testing data to be wiped out.
        </mark>
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="col-sm">
            <div className="input-group">
              <input
                id="backdoorLoginEmail-react"
                type="text"
                className={className({
                  "form-control": true,
                  "is-invalid": isTryToSubmitInvalidEmail,
                  "is-valid": isEmailValid
                })}
                onChange={_onEmailChange}
                value={email}
                placeholder="email"
              />
              <div className="invalid-feedback">please enter valid email</div>
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group">
              <input
                type="text"
                className={className({
                  "form-control": true,
                  "is-invalid": isNameRequire
                })}
                onChange={_onNameChange}
                value={name}
                placeholder="name"
              />
              <div className="invalid-feedback">
                email is not found. Name is require to create new account
              </div>
            </div>
          </div>
          <div className="col-sm">
            {isAjaxing ? (
              <LoadingIcon text="please wait" />
            ) : (
              <input
                type="submit"
                className={className({
                  btn: true,
                  "btn-block": true,
                  "btn-success":
                    isEmailValid &&
                    (!isNameRequire || (isNameRequire && !nameIsEmpty)),
                  "btn-secondary": !isEmailValid,
                  "btn-warning": isTryToSubmitInvalidEmail,
                  "btn-danger": isNameRequire && nameIsEmpty
                })}
                value="back door login"
              />
            )}
          </div>
        </div>
      </form>
    </Style>
  );
}

BackDoorLoginWebView.propTypes = BackdoorLoginViewPropType;
export default BackDoorLoginWebView;
