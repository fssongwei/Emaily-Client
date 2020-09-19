import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions";

const HeaderMenu = ({ loadUser, logOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, user] = loadUser;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <CircularProgress />;
  if (!user)
    return (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    );

  return (
    <>
      <img
        src={user.avatar}
        alt="avatar"
        width="40px"
        style={{ borderRadius: "50%" }}
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <div>
            Welcome, <br />
            <strong>{user.name}</strong>
          </div>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose} component={Link} to="/iBuy">
          <ShoppingCartIcon /> &nbsp; iBuy
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/iSell">
          <StoreIcon /> &nbsp; iSell
        </MenuItem>
        <hr />
        <MenuItem onClick={logOut}>
          <PowerSettingsNewIcon /> &nbsp; Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, { logOut })(HeaderMenu);
