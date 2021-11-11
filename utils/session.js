export const refreshSession = () => {
  // Refresh session (workaround)
  // https://github.com/nextauthjs/next-auth/issues/596#issuecomment-943453568
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
