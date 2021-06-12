import IFirebase from "@stores/interface/IFirebase";
import IChatStore from "@stores/interface/IChatStore";
export { IFirebase, IChatStore };

/** Наименования строго в camelCase, без префикса I */
export default interface IStores {
  firebase: IFirebase;
  chatStore: IChatStore;
}
