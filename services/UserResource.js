import { AsyncStorage } from "react-native";

class UserResource {
  static async setUser(user) {
    return AsyncStorage.setItem("user", JSON.stringify(user));
  }

  static getUser() {
    return AsyncStorage.getItem("user").then(user => JSON.parse(user));
  }
}

export default UserResource;
