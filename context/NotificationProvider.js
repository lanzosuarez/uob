import React from "react";
import Notification from "../services/Notification";

const NotificationContext = React.createContext();

export const NotificationComsumer = NotificationContext.Consumer;

export function NotificationConnect(params = []) {
  return function NotificationConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <NotificationComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </NotificationComsumer>
      );
    };
  };
}

export class NotificationProvider extends React.Component {
  state = {
    notifications: null,
    intervalId: null
  };

  componentWillMount() {
    let intervalId = window.setInterval(() => {
      if (this.state.notifications) {
        Notification.getNotifications()
          .then(res => {
            this.setNotifications(res.data.data);
          })
          .catch(err => {});
      }
    }, 3000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    this.removeInterval();
  }

  removeInterval = () => {
    window.clearInterval(this.state.intervalId);
  };

  setNotifications = notifications =>
    this.setState({
      notifications
    });

  getNotifications = () => this.state.notifications;

  render() {
    return (
      <NotificationContext.Provider
        value={{
          notifications: this.state.notifications,
          setNotifications: this.setNotifications,
          getNotifications: this.getNotifications,
          removeInterval: this.removeInterval
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
