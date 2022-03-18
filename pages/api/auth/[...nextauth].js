import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi,{ LOGIN_URL } from "../../../lib/spotify"

async function refreshToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const {body:refreshedToken}  = await spotifyApi.getRefreshToken();
    return {
      ...token,
      accessToken : refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      // Refresh token if new one is returned, else it remain to the old one
    }
  } catch (error) {
    console.error(error) 
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    } 
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account , user }) {
      // Sign in 1st time, take this token
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username:account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000
        };
      }
      // After go back, check expire, and return the token if it not expired yet
      if( Date.now() < token.accessTokenExpires ) {
        console.log("Access token is still valid");
        return token;
      }
      // Refresh the token
      console.log("Access token is expired now");
      return await refreshToken(token);
    },
    async session ({session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    }
  }
})