export interface Guardian {
  name: String;
  address?: String;
  email?: String;
  cell_phone: String;
  relationship_to_child: String;
};

export interface Sibling {
  name: String;
  age: Number;
};
export interface Student {
  avatar?: String;
  name: String;
  birthday: Date;
  age?: Number; // if birthday not provied;
  gender: String;
  guardians: Guardian[],
  siblings?: Sibling[],
  home_language?: String;
  how_you_know_about_our_school?: String;
  about_child?: String;
  primary_contact?: String;
  preferred_contact?: String;
};