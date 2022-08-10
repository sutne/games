import Cookies from "universal-cookie";

const cookies = new Cookies();

type Preferences = {
  useDarkTheme: boolean;
};

export function setCookiePreferences(preferences: Preferences) {
  for (const [key, value] of Object.entries(preferences)) {
    cookies.set(`preferences.${key}`, value, { path: "/" });
  }
}

export function getCookiePreferences(defaultValues: Preferences): Preferences {
  const preferences = defaultValues;
  for (const [key] of Object.entries(defaultValues)) {
    let cookieValue = cookies.get(`preferences.${key}`);
    if (cookieValue === undefined) continue; // use default
    // JSON.parse to correctly convert datatypes ("false" => false, "0" => 0)
    cookieValue = JSON.parse(cookieValue);
    preferences[key as keyof Preferences] = cookieValue;
  }
  return preferences;
}
