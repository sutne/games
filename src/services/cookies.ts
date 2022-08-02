import Cookies from "universal-cookie";

const cookies = new Cookies();

type Preferences = {
  useDarkTheme: boolean;
};

export function setPrefs(prefs: Preferences) {
  cookies.set("useDarkTheme", prefs.useDarkTheme, { path: "/" });
}

export function getPrefs(defaultValues: Preferences): Preferences {
  let prefs: Preferences = {
    useDarkTheme: cookies.get("useDarkTheme"),
  };
  if (prefs.useDarkTheme === undefined)
    prefs.useDarkTheme = defaultValues.useDarkTheme;
  return prefs;
}
