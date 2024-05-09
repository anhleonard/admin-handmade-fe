import useStorage, { StorageType } from "@/hooks/use-storage";

class Storage {
  private localStorage = useStorage(StorageType.LOCAL);

  getLocalAccessToken() {
    return this.localStorage.getItem("accessToken");
  }

  updateLocalAccessToken(accessToken: string) {
    this.localStorage.setItem("accessToken", accessToken);
  }

  updateLocalUser(user: string) {
    this.localStorage.setItem("user", user);
  }

  getLocalUser() {
    return this.localStorage.getItem("user");
  }

  updateLocalUserId(userId: string) {
    this.localStorage.setItem("userId", userId);
  }

  getLocalUserId() {
    return this.localStorage.getItem("userId");
  }

  removeAccessToken() {
    this.localStorage.removeItem("accessToken");
  }
}

export default new Storage();
