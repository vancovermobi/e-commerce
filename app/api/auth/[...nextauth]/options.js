import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../models/user'
import { connectToDB } from '../../../../utils/database'
import toNonAccentVietnamese from '../../../../components/conVNtoNAC'

export const options = {
  providers: [
    GoogleProvider({
      profile(gogProfile) {
        // console.log("GoogleProfile:", gogProfile);
        return {
                    ...gogProfile,
          id        : gogProfile.sub.toString(),
          username  : toNonAccentVietnamese(gogProfile.name),
          email     : gogProfile.email,
          image     : gogProfile.picture,
          role      : gogProfile.role ?? "user",   
        };
        //console.log("GoogleProfile:", gogProfile);
      },
      clientId      : process.env.GOOGLE_CLIENT_ID,
      clientSecret  : process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      profile(gitProfile) {   
        // console.log("GithubProfile:", gitProfile);     
        return {
                    ...gitProfile,
          id        : gitProfile.id.toString(),
          username  : gitProfile.login,
          email     : gitProfile.email,
          image     : gitProfile.avatar_url,
          role      : gitProfile.role ?? "user",  
        };
        //console.log("GithubProfile:", gitProfile);
      },
      clientId      : process.env.GITHUB_ID,
      clientSecret  : process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label : "Username:",
          type  : "text",
          placeholder: "your-cool-username",
        },
        password: {
          label : "Password:",
          type  : "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs:https://next-auth.js.org/configuration/providers/credentials

        const user = {
          id        : process.env.ADMIN_ID,
          name      : process.env.ADMIN_NAME,
          password  : process.env.ADMIN_PASSWORD,
          role      : process.env.ADMIN_ROLE,
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // if you want to use the role in client components
    async session({ session, token }) {

      if (session?.user) session.user.role = token.role;

      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser._id.toString();
    //   console.log('toNonAccentVietnamese(session.user.name):', toNonAccentVietnamese(session?.user?.name));
       session.user.name = toNonAccentVietnamese(session.user.name)

      return session;
    },
    // Check user
    async signIn({ account, profile, user, credentials }) {
        //console.log('api/auth/nextauth/options/CallBack/SignIn{Account}}:', account)
        //console.log('api/auth/nextauth/options/CallBack/SignIn{Profile}:', profile)
        //console.log('api/auth/nextauth/options/CallBack/SignIn{User}:', user)
        //console.log('api/auth/nextauth/options/CallBack/SignIn{Credentials}:', credentials)
        try {
            await connectToDB()

            // check if a user already exits
            const userExits = await User.findOne({
                email: profile?.email
            })
            // if not, create a new user
            if(!userExits) {
                await User.create({
                    // username: profile.name.replace(" ", "")
                    email   : profile.email,
                    // username: (profile.name!='' || profile.name!=null) ? toNonAccentVietnamese(profile.name) : (profile.login!='' || profile.login!=null) ? (profile.login) : 'noname',
                    username: profile.name!==null ? toNonAccentVietnamese(profile.name) : profile.login!==null ? (profile.login) : 'noname',
                    image   : profile.picture ?? profile.avatar_url,
                })
            }

            return true
        } catch (error) {
            console.log('api/auth/[...nextauth]/options/Error_signIn: ', error);
            return false
        }
    }, 
  },
};

// ====Console Log:----------//

// GoogleProfile: {
//     iss: 'https://accounts.google.com',
//     azp: '462809817301-1b0klr20s6i5jh9j5pfsdim5nnlufmb7.apps.googleusercontent.com',
//     aud: '462809817301-1b0klr20s6i5jh9j5pfsdim5nnlufmb7.apps.googleusercontent.com',
//     sub: '117074251745167823622',
//     email: 'pal.pham@gmail.com',
//     email_verified: true,
//     at_hash: '2xRlQp9JkdFh6_MiB9aWXw',
//     name: 'Pham Pal',
//     picture: 'https://lh3.googleusercontent.com/a/AAcHTtczymxTR_p5_jmTqpPiPHYkLDlvJjQNUBhliYJTModPb7c=s96-c',
//     given_name: 'Pham',
//     family_name: 'Pal',
//     locale: 'vi',
//     iat: 1689480382,
//     exp: 1689483982
// }

// GithubProfile: {
//     login: 'vancovermobi',
//     id: 70420449,
//     node_id: 'MDQ6VXNlcjcwNDIwNDQ5',
//     avatar_url: 'https://avatars.githubusercontent.com/u/70420449?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/vancovermobi',
//     html_url: 'https://github.com/vancovermobi',
//     followers_url: 'https://api.github.com/users/vancovermobi/followers',
//     following_url: 'https://api.github.com/users/vancovermobi/following{/other_user}',
//     gists_url: 'https://api.github.com/users/vancovermobi/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/vancovermobi/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/vancovermobi/subscriptions',
//     organizations_url: 'https://api.github.com/users/vancovermobi/orgs',
//     repos_url: 'https://api.github.com/users/vancovermobi/repos',
//     events_url: 'https://api.github.com/users/vancovermobi/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/vancovermobi/received_events',
//     type: 'User',
//     site_admin: false,
//     name: null,
//     company: null,
//     blog: '',
//     location: null,
//     email: 'vancovermobi@gmail.com',
//     hireable: null,
//     bio: null,
//     twitter_username: null,
//     public_repos: 27,
//     public_gists: 0,
//     followers: 0,
//     following: 0,
//     created_at: '2020-08-29T02:35:48Z',
//     updated_at: '2023-06-27T14:47:58Z',
//     private_gists: 1,
//     total_private_repos: 2,
//     owned_private_repos: 2,
//     disk_usage: 107035,
//     collaborators: 0,
//     two_factor_authentication: false,
//     plan: {
//       name: 'free',
//       space: 976562499,
//       collaborators: 0,
//       private_repos: 10000
//     }
//   }
