// Redirect to client
function redirectToClient() {
  const clientUrl = window.CLIENT_URL || 'https://getsafezone.vercel.app';
  window.location.href = clientUrl;
}
