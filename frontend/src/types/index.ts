export type Locale = "en" | "uk";

export interface IHome {
  title: string;
  subtitle: string;
  btn: string;
  sellersTitle: string;
  findTitle: string;
}

export interface IHeader {
  nameFirst: string;
  nameLast: string;
  links: string[];
}

export interface IFooter {
  nameFirst: string;
  nameLast: string;
  subtitle: string;
  contactUs: string;
}

export interface IShop {
  search: string;
  cheap: string;
  expensive: string;
}

export interface IAddNewValidation {
  min: string;
  required: string;
  minNumber: string;
}

export interface IAddNew {
  btn: string;
  validation: IAddNewValidation;
  name: string;
  desc: string;
  category: string;
  price: string;
  quantity: string;
  submitBtn: string;
}

export interface IEditProductValidation {
  min: string;
  required: string;
  minNumber: string;
}

export interface IEditProduct {
  title: string;
  validation: IEditProductValidation;
  name: string;
  desc: string;
  category: string;
  price: string;
  quantity: string;
  submitBtn: string;
}

export interface IAdmin {
  search: string;
  cancel: string;
  addNew: IAddNew;
  editProduct: IEditProduct;
}

export interface IInfoValidation {
  email: string;
  required: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export interface IModal {
  title: string;
  text: string;
  btnText: string;
}

export interface IProfileInfo {
  submitBtn: string;
  uploadPhoto: string;
  phoneTitle: string;
  phonePlaceh: string;
  emailTitle: string;
  emailPlaceh: string;
  firstName: string;
  lastName: string;
  gender: string[];
  genderTitle: string;
  stateTitle: string;
  statePlaceh: string;
  cityTitle: string;
  cityPlaceh: string;
  zipCodeTitle: string;
  zipCodePlaceh: string;
  addressTitle: string;
  addressPlaceh: string;
  validation: IInfoValidation;
  modal: IModal;
}

export interface IProfile {
  tabNames: string[];
  contact: string;
  logOut: string;
  info: IProfileInfo;
}

export interface IItem {
  perUnit: string;
  total: string;
}

export interface ICart {
  noItemsText: string;
  yourCart: string;
  subtotal: string;
  checkout: string;
  item: IItem;
}

export interface IProductItem {
  addToCart: string;
  morePhotos: string;
  each: string;
}

export interface IProductCard {
  in: string;
  add: string;
}

export interface ISigninPlaceholders {
  email: string;
  password: string;
}

export interface ISigninModal {
  title: string;
  text: string;
  btnText: string;
}

export interface ISignupModal {
  title: string;
  text: string;
  btnText: string;
}

export interface ISigninValidation {
  email: string;
  required: string;
  min: string;
  max: string;
}

export interface ISignin {
  title: string;
  subtitle: string;
  rememberMe: string;
  submitBtn: string;
  ask: string;
  forgotPassText: string;
  linkText: string;
  placeholders: ISigninPlaceholders;
  modal: ISigninModal;
  validation: ISigninValidation;
}

export interface ISignupPlaceholder {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignupValidation {
  email: string;
  required: string;
  passwordConfirm: string;
  min: string;
  max: string;
}

export interface ISignup {
  title: string;
  subtitle: string;
  submitBtn: string;
  ask: string;
  linkText: string;
  placeholder: ISignupPlaceholder;
  validation: ISignupValidation;
  modal: ISignupModal;
}

export interface IPages {
  home: IHome;
  header: IHeader;
  footer: IFooter;
  shop: IShop;
  admin: IAdmin;
  profile: IProfile;
  cart: ICart;
  productItem: IProductItem;
  productCard: IProductCard;
  signup: ISignup;
  signin: ISignin;
}
