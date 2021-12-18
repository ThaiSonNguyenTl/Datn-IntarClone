import React, { useState, memo, Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import { selectCurrentUser } from "../../redux/user/userSelectors";

import useScrollPositionThrottled from "../../hooks/useScrollPositionThrottled";

import { ReactComponent as LogoCamera } from "../../assets/svg/logo-camera.svg";
import SearchBox from "../SearchBox/SearchBox";
import NewPostButton from "../NewPost/NewPostButton/NewPostButton";
import NotificationButton from "../Notification/NotificationButton/NotificationButton";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import { showModal } from '../../redux/modal/modalActions';
import { signOut } from '../../redux/user/userActions';

const Header = memo(({ currentUser, showModal, signOut }) => {
  const [shouldMinimizeHeader, setShouldMinimizeHeader] = useState(false);
  const {
    location: { pathname },
    history
  } = useHistory();

  // Shrink header height and remove logo on scroll
  useScrollPositionThrottled(({ currentScrollPosition }) => {
    if (window.outerWidth > 600) {
      setShouldMinimizeHeader(currentScrollPosition > 100);
    }
  });

  const headerClassNames = classNames({
    header: true,
    "header--small": shouldMinimizeHeader,
  });

  return (
    <header className={headerClassNames}>
      <div className="header__content">
        <Link to="/" className="header__logo">
          <div className="header__logo-image">
            <LogoCamera />
          </div>
          <div className="header__logo-header">
            <h3 className="heading-logo">ThaiSon_Network</h3>
          </div>
        </Link>
        <SearchBox />
        <div className="header__icons">
          {currentUser ? (
            <Fragment>
              <Link to="/">
                <Icon icon={pathname === "/" ? "home" : "home-outline"} />
              </Link>
              <Link to={"/message"}>
                <Icon
                  className="icon--button"
                  icon={
                    pathname === "/message"
                      ? "paper-plane"
                      : "paper-plane-outline"
                  }
                />
              </Link>
              <NewPostButton plusIcon />
              <Link to="/explore">
                <Icon
                  icon={pathname === "/explore" ? "compass" : "compass-outline"}
                />
              </Link>
              <NotificationButton />
              {/* <Link to={"/" + currentUser.username}> */}
                <Avatar
                  className="avatar--small-header"
                  imageSrc={currentUser.avatar}
                  onClick={() => {
                    showModal(
                      {
                        options: [
                          {
                            text: 'Change Password',
                            onClick: () => history.push('/settings/password'),
                          },
                          {
                            text: 'Log Out',
                            onClick: () => {
                              signOut();
                              history.push('/');
                            },
                          },
                        ],
                      },
                      'OptionsDialog/OptionsDialog'
                    );
                  }}
                />
              {/* </Link> */}
            </Fragment>
          ) : (
            <Fragment>
              <Link style={{ marginRight: "1rem" }} to="/login">
                <Button>Log In</Button>
              </Link>
              <Link to="/signup">
                <h3 className="heading-3 heading--button color-blue">
                  Sign Up
                </h3>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
});

Header.whyDidYouRender = true;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  showModal: (props, component) => dispatch(showModal(props, component)),
  signOut: () => dispatch(signOut()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
